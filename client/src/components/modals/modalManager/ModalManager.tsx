import { useModalStore } from "@/store/useModalStore";
import { CreateBriefModal } from "../createBriefModal/CreateBriefModal";
import { CreateProfileModal } from "../createUserModal/CreateUserModal";
import { DownloadModal } from "../downloadModal/Downloadmodal";
import { CreateClientModal } from "../createClientModal/CreateClientModal";
import { EditClientModal } from "../editClientModal/EditClientModal";

export const ModalManager = () => {
  const { isOpen, type } = useModalStore();

  if (!isOpen) return null;

  switch (type) {
    case "DOWNLOAD":
      return <DownloadModal />;

    case "CREATE_BRIEF":
      return <CreateBriefModal />;

    case "CREATE_USER":
      return <CreateProfileModal />;

    case "CREATE_CLIENT":
      return <CreateClientModal />;

    case "EDIT_CLIENT":
      return <EditClientModal />;

    default:
      return null;
  }
};
