"use client";

import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Avatar, AvatarGroup } from "@heroui/avatar";
import { Card } from "@heroui/card";
import Link from "next/link";
import { FaInfoCircle, FaYoutube, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" size="2xl">
      <ModalContent>
        <ModalHeader className="flex items-center gap-2 border-b border-border py-3 px-4">
          <FaInfoCircle className="text-primary" />
          <span className="font-bold">Welcome to MLOps Project</span>
        </ModalHeader>
        <ModalBody className="py-4 px-5 space-y-3">
          {/* Team Members Avatars */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="mb-2">
              <AvatarGroup isBordered>
                <Avatar 
                  size="lg" 
                  src="https://media.licdn.com/dms/image/v2/D5603AQGNo_IXOWH0rg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1699194129699?e=1749081600&v=beta&t=RXsrqow-3ADtycrh20xMW1EBptrqevYo4npDWfpm6_c" 
                  name="GK"
                  onClick={() => window.open("https://www.linkedin.com/in/karthik-gangula/", "_blank")}
                />
                <Avatar 
                  size="lg" 
                  src="https://media.licdn.com/dms/image/v2/D5603AQGKr0iS6ZW8Hw/profile-displayphoto-shrink_400_400/B56ZWzmGiKHQAg-/0/1742474865941?e=1749081600&v=beta&t=5ExdMgbzCaDES2MIDDM1kABdATMyhPTecqb4rBI_SK8" 
                  name="WJ"
                  onClick={() => window.open("https://www.linkedin.com/in/wei-jun-choy/", "_blank")}
                />
                <Avatar 
                  size="lg" 
                  src="https://cdn.discordapp.com/avatars/391279681644527629/f3d164772b4d0463d85487f53c7033e0.webp?size=240" 
                  name="GL"
                  onClick={() => window.open("https://github.com/loheegenegabriel", "_blank")}
                />
              </AvatarGroup>
            </div>
            <p className="text-sm font-medium">Our Team: Karthik, Weijun, and Gabriel</p>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Explore our ML models built by Karthik, Weijun, and Gabriel. Backend is taken down due to budget limits, check out the YouTube demo or GitHub repo instead.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-muted/30 border border-border" isHoverable={true}>
              <div className="p-3">
                <div className="text-left">
                  <h3 className="font-semibold flex items-center gap-2 text-sm mb-1">
                    <FaYoutube className="text-red-500" />
                    Watch Our Demo
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Get a quick overview of our project features.
                  </p>
                  <Link 
                    href="https://youtu.be/3A7-HXlz9pw" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline font-medium text-sm"
                  >
                    YouTube Demo <FaExternalLinkAlt className="text-xs" />
                  </Link>
                </div>
              </div>
            </Card>
            
            <Card className="bg-muted/30 border border-border" isHoverable={true}>
              <div className="p-3">
                <div className="text-left">
                  <h3 className="font-semibold flex items-center gap-2 text-sm mb-1">
                    <FaGithub />
                    View our code
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Look through our code and implementation.
                  </p>
                  <Link 
                    href="https://github.com/gangula-karthik/MLOps-Assignment" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline font-medium text-sm"
                  >
                    Github Link <FaExternalLinkAlt className="text-xs" />
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-between border-t border-border py-3 px-4">
          <Button 
            variant="flat"
            color="danger" 
            size="sm"
            onClick={onClose}
          >
            Close
          </Button>
          <Button 
            variant="shadow"
            color="primary"
            size="sm"
            onClick={() => {
              window.open("https://youtu.be/3A7-HXlz9pw", "_blank");
              onClose();
            }}
          >
            Watch Demo
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
