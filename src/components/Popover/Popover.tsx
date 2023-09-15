import { useState, FC } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Button, Popover } from "antd";

import { useAppDispatch } from "../../hook/redux-hook";
import { GetCookie } from "../../hook/Cookies";

import { fetchDeleteArticle } from "../../store/reducer/article/action-creator";

import warning from "../../assets/images/warning.svg";

import classes from "./Popover.module.scss";

const PopoverModal: FC = () => {
  const [open, setOpen] = useState(false);
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleFetchDeletArticle = () => {
    console.log(slug);
    dispatch(fetchDeleteArticle(slug!, JSON.parse(GetCookie("userToken")!)));
    navigate("/");
  };

  const content = (
    <div className={classes.modalContainer}>
      <div className={classes.modalContent}>
        <img src={warning} alt="warning" />
        <p className={classes.modalText}>
          Are you sure to delete this article?
        </p>
      </div>
      <div className={classes.btn}>
        <button className={classes.btnNo} onClick={hide}>
          No
        </button>
        <button className={classes.btnYes} onClick={handleFetchDeletArticle}>
          Yes
        </button>
      </div>
    </div>
  );
  return (
    <Popover
      content={content}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button className={classes.btnDelete}>Delete</Button>
    </Popover>
  );
};

export default PopoverModal;
