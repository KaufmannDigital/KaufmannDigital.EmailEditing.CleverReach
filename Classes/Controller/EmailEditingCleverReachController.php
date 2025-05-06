<?php

namespace KaufmannDigital\EmailEditing\CleverReach\Controller;

use KaufmannDigital\CleverReach\Domain\Service\CleverReachApiService;
use KaufmannDigital\EmailEditing\Service\MjmlService;
use Neos\ContentRepository\Domain\Model\NodeInterface;
use Neos\ContentRepository\Domain\Service\ContextFactoryInterface;
use Neos\Eel\FlowQuery\FlowQuery;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\I18n\Locale;
use Neos\Flow\I18n\Translator;
use Neos\Flow\Mvc\ActionRequest;
use Neos\Flow\Mvc\ActionResponse;
use Neos\Flow\Mvc\Controller\RestController;
use Neos\Flow\Mvc\View\JsonView;
use Neos\Flow\Package\PackageManager;
use Neos\Neos\Service\UserService;
use Neos\Neos\Ui\Domain\Model\Feedback\Messages\Error;
use Neos\Neos\Ui\Domain\Model\Feedback\Messages\Success;
use Neos\Neos\Ui\Domain\Model\FeedbackCollection;
use Neos\Neos\View\FusionView;
use Spatie\Mjml\Mjml;
use Spatie\Mjml\ValidationLevel;


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

    #[Flow\Inject]
    protected MjmlService $mjmlService;

    protected function initializeController(ActionRequest $request, ActionResponse $response)
    {
        parent::initializeController($request, $response);
        $this->feedbackCollection->setControllerContext($this->getControllerContext());
        $this->locale = new Locale($this->userService->getInterfaceLanguage());
    }


    public function submitAction(NodeInterface $node, array $options = []): void
    {
        $mailingId = $node->getProperty('cleverReachMailingId');

        $mailingTitle = $node->getProperty('title');
        $subject = $node->getProperty('cleverReachSubject');
        $senderName = $node->getProperty('cleverReachSenderName');
        $senderMail = $node->getProperty('cleverReachSenderMail');
        $groups = $node->getProperty('cleverReachReceiverGroup');

        if (empty($mailingTitle) || empty($subject) || empty($senderName) || empty($senderMail) || empty($groups)) {
            $error = new Error();
            $message = $this->translator->translateById('inputIncomplete', [], null, $this->locale, 'Main', 'KaufmannDigital.EmailEditing.CleverReach');
            $error->setMessage($message);
            $this->feedbackCollection->add($error);
            $this->view->assign("value", ['feedback' => $this->feedbackCollection, 'message' => $message]);
            return;
        }


        $mjml = $this->mjmlService->getMjmlSourceForEmail($node, $this->controllerContext);

        $html = Mjml::new()
            ->validationLevel(ValidationLevel::Skip)
            ->toHtml($mjml);


        $data = [
            "name" => $mailingTitle,
            "subject" => $subject,
            "sender_name" => $senderName,
            "sender_email" => $senderMail,
            "content" => [
                "type" => "html",
                "html" => $html
            ],
            "receivers" => [
                "groups" => [
                    $groups,
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
                $mailingResponse = $this->cleverReachApiService->updateMailing($mailingId, $data);
                if (isset($mailingResponse['error'])) {
                    throw new \Exception($mailingResponse['error']['message']);
                }
            } else {
                $mailingResponse = $this->cleverReachApiService->createMailing($data);
                $mailingId = $mailingResponse['id'];
                $node->setProperty('cleverReachMailingId', $mailingId);
            }

            $success = new Success();
            $message = $this->translator->translateById('submitSuccess', [], null, $this->locale, 'Main', 'KaufmannDigital.EmailEditing.CleverReach');
            $success->setMessage($message);
            $this->feedbackCollection->add($success);
        } catch (\Exception $e) {
            $error = new Error();
            $message = $this->translator->translateById('submitError', [], null, $this->locale, 'Main', 'KaufmannDigital.EmailEditing.CleverReach');
            $error->setMessage($message);

            $this->feedbackCollection->add($error);
            $response['error'] = $e->getMessage();
        }

        $response['message'] = $message;
        $response['feedback'] = $this->feedbackCollection;

        $this->view->assign('value', $response);
    }
}
