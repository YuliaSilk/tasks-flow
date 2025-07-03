import React, {Suspense} from "react";

interface ModalWrapperProps {
 children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({children}) => {
 return (
  <Suspense
   fallback={
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
     <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark rounded-2xl shadow-lg p-6 transform transition-all scale-95">
      <div className="flex items-center justify-center">
       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-light dark:border-primary-dark"></div>
      </div>
     </div>
    </div>
   }
  >
   {children}
  </Suspense>
 );
};

export default ModalWrapper;
