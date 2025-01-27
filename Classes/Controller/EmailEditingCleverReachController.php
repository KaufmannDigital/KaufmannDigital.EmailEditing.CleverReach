<?php

namespace KaufmannDigital\EmailEditing\CleverReach\Controller;

use KaufmannDigital\CleverReach\Domain\Service\CleverReachApiService;
use Neos\ContentRepository\Domain\Model\NodeInterface;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Mvc\ActionRequest;
use Neos\Flow\Mvc\ActionResponse;
use Neos\Flow\Mvc\Controller\RestController;
use Neos\Flow\Mvc\View\JsonView;
use Neos\Neos\Ui\Domain\Model\Feedback\Messages\Error;
use Neos\Neos\Ui\Domain\Model\Feedback\Messages\Info;
use Neos\Neos\Ui\Domain\Model\FeedbackCollection;


class EmailEditingCleverReachController extends RestController
{
    protected $defaultViewObjectName = JsonView::class;

    #[Flow\Inject]
    protected CleverReachApiService $cleverReachApiService;

    #[Flow\Inject]
    protected FeedbackCollection $feedbackCollection;


    protected function initializeController(ActionRequest $request, ActionResponse $response)
    {
        parent::initializeController($request, $response);
        $this->feedbackCollection->setControllerContext($this->getControllerContext());
    }


    public function submitAction(NodeInterface $node, array $options = []): void
    {
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
            $this->cleverReachApiService->createMailing($data);

            $success = new Info();
            $success->setMessage('Mailing übermittelt.'); // TODO: i18n
            $this->feedbackCollection->add($success);
        } catch (\Exception $e) {
            $error = new Error('Fehler beim übermitteln des Mailings.'); // todo: i18n
            $this->feedbackCollection->add($error);
            $response['error'] = $e->getMessage();
        }

        $response['feedback'] = $this->feedbackCollection;

        $this->view->assign('value', $response);
    }
}
