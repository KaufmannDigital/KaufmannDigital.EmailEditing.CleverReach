<?php

namespace KaufmannDigital\EmailEditing\CleverReach\EventHandler;

use Neos\ContentRepository\Domain\Model\NodeInterface;
use Neos\Flow\Annotations as Flow;

/**
 * @Flow\Scope("singleton")
 */
class NodeEventHandler
{
    public function resetCleverReachMailingIdOnNodeAdded(NodeInterface $node): void
    {
        if (!$node->getNodeType()->isOfType('KaufmannDigital.EmailEditing:Document.Email')) {
            return;
        }

        if ($node->getProperty('cleverReachMailingId') !== null) {
            $node->setProperty('cleverReachMailingId', null);
        }
    }
}