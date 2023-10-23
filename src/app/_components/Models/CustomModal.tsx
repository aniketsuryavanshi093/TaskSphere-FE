/* eslint-disable no-unused-vars */
"use client"
import React from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import './modal.css';

type PageProps = {
  isOpen: boolean
  onClose: () => void;
  title?: string
  children: React.JSX.Element
  handleCLick?: () => void
  btntext?: string
  isBtn?: boolean,
  onBackclick?: () => void,
  headerclass?: string,
  width?: string,
  size?: "sm" | "md" | "lg",
}

const CustomModal: React.FC<PageProps> = ({
  isOpen,
  onClose,
  title,
  children,
  handleCLick,
  btntext,
  isBtn,
  onBackclick,
  headerclass,
  width,
  size,
}) => {
  return (
    <Modal
      size={size || 'md'}
      style={{ width }}
      backdrop="static"
      isOpen={isOpen}
      centered
      scrollable
    >
      <ModalBody className="position-relative">
        <div
          className={`header2famethod wrapper position-relative ${headerclass} justify-content-start mx-2 `}
        >
          {onBackclick && (
            <div className="wrapper goBackIcon" onClick={onBackclick}>
              <i className="fa-solid fa-chevron-left me-2" />
              <p className="mb-0"> Go Back </p>
            </div>
          )}
          <h5 className="modal-title text-center  w-100">{title}</h5>
        </div>
        {onClose && (
          <div onClick={onClose} className="closemark cp">
            <i className="fa-solid fa-xmark" />
          </div>
        )}
        {children}
      </ModalBody>
      {isBtn && (
        <ModalFooter className="footer2famethod">
          <Button className="w-50" color="primary" onClick={handleCLick}>
            {btntext}
          </Button>
        </ModalFooter>
      )}
    </Modal>
  );
};

export default React.memo(CustomModal);
