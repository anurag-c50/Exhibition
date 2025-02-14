import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import CreateExhibitionaPage from "../AdminDashboardcomponent/CreateExhibitionPage";
import { IsAuth } from "../redux/features/IsAuthSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { FetchAdminExhibition } from "../redux/features/ExhibitionSlice";
import ExhibitionInfo from "../AdminDashboardcomponent/ExhibitionInfo";
import { useNavigate } from "react-router-dom";
import {
  setAlllogoutStatus,
  UserAllLogout,
  UserLogout,
} from "../redux/features/LogoutSlice";
import { setLoginData } from "../redux/features/AdminSignupAndLoginSlice";
import { setLogoutStatus } from "../redux/features/LogoutSlice";
import { setSelectExhibitionData } from "../redux/features/ExhibitionSlice";

export default function AdminDashbord() {
  const [addExhibition, setAddExhibition] = useState(false);
  const [showAllinfoExhibition, setShowAllinfoExhibition] = useState(false);
  const [selectExhibitionIndex, setSelectExhibitionIndex] = useState();
  const UserData = JSON.parse(localStorage.getItem("UserData"));
  const AllAdminExhibition = useSelector(
    (state) => state?.exhibitionReducer?.adminExhibition
  );
  const selectEhibitionStaffData = useSelector(
    (state) => state?.exhibitionReducer?.selectExhibitionStaffData
  );
  const AlllogoutStatus = useSelector(
    (state) => state?.logoutReducer?.AlllogoutStatus
  );
  const logoutStatus = useSelector(
    (state) => state?.logoutReducer?.logoutStatus
  );
  const addExhibitionData = useSelector(
    (state) => state?.exhibitionReducer?.exhibitionData
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(IsAuth());
    dispatch(FetchAdminExhibition());
    if (selectEhibitionStaffData) {
      dispatch(setSelectExhibitionData(null));
    }
  }, [addExhibitionData, selectEhibitionStaffData]);
  const Logout = () => {
    dispatch(UserLogout(UserData?.userEmail));
  };
  const AllLogout = () => {
    dispatch(UserAllLogout());
  };

  const isShowInfoChange = (index) => {
    setSelectExhibitionIndex(index);
    setShowAllinfoExhibition(!showAllinfoExhibition);
  };
  useEffect(() => {
    if (logoutStatus?.status) {
      dispatch(setLoginData(null));
      dispatch(setLogoutStatus(null));
      navigate("/");
    }
    if (AlllogoutStatus?.status) {
      dispatch(setLoginData(null));
      dispatch(setAlllogoutStatus(null));
      navigate("/");
    }
  }, [logoutStatus, AlllogoutStatus]);
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl">Admin Dashboard</h1>
            <div className="space-x-4">
              <input
                type="button"
                onClick={() => {
                  Logout();
                }}
                value="Logout "
                className="hover:bg-red-500 px-4 py-2 rounded"
              />
              <input
                type="button"
                onClick={() => {
                  AllLogout();
                }}
                value="Logout From All devices"
                className="hover:bg-red-500 px-4 py-2 rounded"
              />
            </div>
          </div>
        </nav>

        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-semibold">All Exhibitions</h2>
            <button
              onClick={() => {
                setAddExhibition(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              Add New Exhibition
            </button>
          </div>
          <div className="border-[5px] border-blue-600 w-[84.4vw] rounded-[10px] overflow-y-auto h-auto">
            {AllAdminExhibition &&
            AllAdminExhibition?.adminExhibitons.length === 0 ? (
              <div className="w-[100%] text-gray-400 text-center">
                <h1>The admin hasn't set up any exhibitions yet.</h1>
              </div>
            ) : (
              AllAdminExhibition &&
              AllAdminExhibition?.adminExhibitons?.map((exhibition, index) => {
                return (
                  <div className=" h-[20vh] m-[4px] relative">
                    <img
                      className="w-[100%]  h-[100%] rounded-[10px] absolute brightness-[0.5]"
                      src={exhibition.exhibitionBannerImg}
                      alt=""
                    />
                    <h1 className="text-white absolute w-[100%] text-center font-extrabold">
                      {exhibition.exhibitionName}
                    </h1>
                    <div className="absolute bottom-0 w-[100%] h-[63%] flex justify-center gap-[20px] items-center">
                      <button
                        onClick={() => {
                          isShowInfoChange(index);
                        }}
                        className="h-[36%] w-[10%] rounded hover:bg-blue-500  bg-blue-600 text-2xl text-[antiquewhite] text-[20px]"
                      >
                        All Info
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <Modal show={showAllinfoExhibition} size="lg">
        <ExhibitionInfo
          selectExhibitionIndex={selectExhibitionIndex}
          showAllinfoExhibition={showAllinfoExhibition}
          setShowAllinfoExhibition={setShowAllinfoExhibition}
          AllAdminExhibition={AllAdminExhibition}
        />
      </Modal>
      <Modal
        onHide={() => {
          setAddExhibition(false);
        }}
        size="lg"
        show={addExhibition}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            <h2 className="text-3xl text-center font-semibold text-blue-600 mb-6">
              Create New Exhibition
            </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateExhibitionaPage setAddExhibition={setAddExhibition} />
        </Modal.Body>
      </Modal>
    </>
  );
}
