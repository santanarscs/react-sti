import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';
import Modal from '../components/Modal';

// interface IModal {
//   id: string;
//   size: 'big' | 'mediun' | 'small';
//   title?: string;
//   component?: React.ComponentType;
//   Component?: React.ComponentType;
// }
// interface IModalContextData {
//   open(data: Omit<IModal, 'id'>): void;
//   close(id: string): void;
// }

// const ModalContext = createContext<IModalContextData>({} as IModalContextData);
const ModalContext = createContext<any>({} as any);

const ModalProvider: React.FC = ({ children }) => {
  const [modal, setModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>(
    'modal sem conteudo',
  );
  const handleModal = (content = false) => {
    setModal(!modal);
    if (content) {
      setModalContent(content.toString());
    }
  };

  return (
    <ModalContext.Provider value={{ modal, handleModal, modalContent }}>
      <Modal size="big" />
      {children}
    </ModalContext.Provider>
  );
};

// const ModalProvider: React.FC = ({ children }) => {
//   const [modalProps, setModalProps] = useState<IModal>({} as IModal);
//   const open = useCallback(({ size, title, component }: Omit<IModal, 'id'>) => {
//     const modal = {
//       id: uuid(),
//       size,
//       title,
//       component,
//     };
//     console.log(modal);
//     setModalProps(modal);
//   }, []);
//   const close = useCallback((id: string) => {
//     setModalProps((state) => (state.id === id ? ({} as IModal) : state));
//   }, []);
//   const { component: Component } = modalProps;
//   return (
//     <ModalContext.Provider value={{ open, close }}>
//       {children}
//       <ModalContainer size={modalProps.size}>
//         <Component />
//       </ModalContainer>
//     </ModalContext.Provider>
//   );
// };

// function useModal(): IModalContextData {
//   const context = useContext(ModalContext);

//   if (!context) {
//     throw new Error('useModal must be used within ModalProvider');
//   }
//   return context;
// }
// export { ModalProvider, useModal };
