import React from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useColorModeValue } from '@chakra-ui/react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xs">
            <ModalOverlay />
            <ModalContent bg={useColorModeValue("teal.50", "teal.800")} color={useColorModeValue("teal.700", "teal.200")} mx={4}>
                <ModalHeader>Delete Post</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this post?
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="teal" mr={3} onClick={onConfirm} w="100%">
                        Confirm
                    </Button>
                    <Button variant="ghost" onClick={onClose} w="100%">
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteConfirmationModal;
