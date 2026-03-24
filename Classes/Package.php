<?php

namespace KaufmannDigital\EmailEditing\CleverReach;

use KaufmannDigital\EmailEditing\CleverReach\EventHandler\NodeEventHandler;
use Neos\ContentRepository\Domain\Model\Node;
use Neos\Flow\Core\Bootstrap;
use Neos\Flow\Package\Package as BasePackage;

class Package extends BasePackage
{
    public function boot(Bootstrap $bootstrap): void
    {
        $dispatcher = $bootstrap->getSignalSlotDispatcher();

        $dispatcher->connect(
            Node::class,
            'nodeAdded',
            NodeEventHandler::class,
            'resetCleverReachMailingIdOnNodeAdded'
        );
    }
}