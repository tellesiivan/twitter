import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false /*const [modalState, setModalState] = useState(false); */,
});

export const postIdState = atom({
  key: "postIdState",
  default: "",
});
