<?php

namespace KaufmannDigital\EmailEditing\CleverReach\Controller;

use KaufmannDigital\CleverReach\Domain\Service\CleverReachApiService;
use Neos\ContentRepository\Domain\Model\NodeInterface;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\I18n\Locale;
use Neos\Flow\I18n\Translator;
use Neos\Flow\Mvc\ActionRequest;
use Neos\Flow\Mvc\ActionResponse;
use Neos\Flow\Mvc\Controller\RestController;
use Neos\Flow\Mvc\View\JsonView;
use Neos\Neos\Service\UserService;
use Neos\Neos\Ui\Domain\Model\Feedback\Messages\Error;
use Neos\Neos\Ui\Domain\Model\Feedback\Messages\Success;
use Neos\Neos\Ui\Domain\Model\FeedbackCollection;


class EmailEditingCleverReachController extends RestController
{
    protected $defaultViewObjectName = JsonView::class;

    #[Flow\Inject]
    protected CleverReachApiService $cleverReachApiService;

    #[Flow\Inject]
    protected FeedbackCollection $feedbackCollection;

    #[Flow\Inject]
    protected Translator $translator;

    protected Locale $locale;

    #[Flow\Inject]
    protected UserService $userService;

    protected function initializeController(ActionRequest $request, ActionResponse $response)
    {
        parent::initializeController($request, $response);
        $this->feedbackCollection->setControllerContext($this->getControllerContext());
        $this->locale = new Locale($this->userService->getInterfaceLanguage());
    }


    public function submitAction(NodeInterface $node, array $options = []): void
    {
        $mailingId = $node->getProperty('cleverReachMailingId');

        $data = [
            "name" => $node->getProperty('title'),
            "subject" => $node->getProperty('cleverReachSubject'),
            "sender_name" => $node->getProperty('cleverReachSenderName'),
            "sender_email" => $node->getProperty('cleverReachSenderMail'),
            "content" => [
                "type" => "html",
                "html" => '<html><body>TODO REPLACE WITH MAILING CONTENT</body></html>',
            ],
            "receivers" => [
                "groups" => [
                    $node->getProperty('cleverReachReceiverGroup'),
                ]
            ],
            "settings" => [
                "editor" => "advanced"
            ],
            "tags" => [
                "setup_v2"
            ]
        ];

        $response = [];

        try {
            if ($mailingId) {
                $this->cleverReachApiService->updateMailing($mailingId, $data);
            } else {
                $mailingResponse = $this->cleverReachApiService->createMailing($data);
                $mailingId = $mailingResponse['id'];
                $node->setProperty('cleverReachMailingId', $mailingId);
            }

            $success = new Success();
            $success->setMessage($this->translator->translateById('submitSuccess', [], null, $this->locale, 'Main', 'KaufmannDigital.EmailEditing.CleverReach'));
            $this->feedbackCollection->add($success);
        } catch (\Exception $e) {
            $error = new Error();
            $error->setMessage($this->translator->translateById('submitError', [], null, $this->locale, 'Main', 'KaufmannDigital.EmailEditing.CleverReach'));

            $this->feedbackCollection->add($error);
            $response['error'] = $e->getMessage();
        }

        $response['feedback'] = $this->feedbackCollection;

        $this->view->assign('value', $response);
    }
}
