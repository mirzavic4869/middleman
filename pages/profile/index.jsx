import { deleteCookie, getCookie } from "cookies-next";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";

import Navbar from "../../components/Navbar";
import InputCustom from "../../components/InputCustom";
import { AddButton } from "../../components/CustomButton";

export async function getServerSideProps({ req, res }) {
  const token = getCookie("token", { req, res });
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/welcome",
      },
    };
  }
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch("https://postme.site/users", requestOptions);
  const data = await response.json();
  if (response.status === 200) {
    return {
      props: { code: data.code, data: data.data, message: data.message, token },
    };
  } else {
    deleteCookie("token");
    return {
      redirect: {
        permanent: false,
        destination: "/auth/welcome",
      },
    };
  }
}

const Profile = ({ data }) => {
  const token = getCookie("token");
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [objSubmit, setObjSubmit] = useState(data);

  // update user
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      name: objSubmit.name,
      email: objSubmit.email,
      phone: objSubmit.phone,
      address: objSubmit.address,
    };

    let requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch(`https://postme.site/users`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
        alert(message);
      })
      .catch((error) => {
        console.log(error);
        alert(error.toString());
      })
      .finally(() => {
        setLoading(false);
        setShowModal(false);
      });
  };

  // delete user
  const handleDelete = () => {
    setLoading(true);
    var requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    fetch("https://postme.site/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message, code } = result;
        if (code === 200) {
          alert(message);
          deleteCookie("token");
          router.push("/auth/welcome");
        }
      })
      .catch((error) => alert(error.toString()))
      .finally(() => setLoading(false));
  };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };

  if (loading) {
    <div>wait loading</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center bg-base-100">
        <div className="h-1/2 md:w-[32rem]">
          {/* judul */}
          <h1 className="text-left mb-6 text-black font-Roboto font-semibold text-[30px] md:text-[50px]">
            My Profile
          </h1>

          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <tbody className="font-Poppins">
                <tr>
                  <td className="md:text-xl">Shop Name</td>
                  <td className="text-right md:text-xl">{objSubmit.name}</td>
                </tr>
                <tr>
                  <td className="md:text-xl">Email</td>
                  <td className="text-right md:text-xl">{objSubmit.email}</td>
                </tr>
                <tr>
                  <td className="md:text-xl">Phone Number</td>
                  <td className="text-right md:text-xl">{objSubmit.phone}</td>
                </tr>
                <tr>
                  <td className="md:text-xl">Address</td>
                  <td className="text-right md:text-xl">{objSubmit.address}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* button */}
          <div className="flex flex-col mt-6">
            {/* edit button */}
            <label
              id="open-modal"
              onClick={() => {
                setShowModal(true);
              }}
              className="btn btn-sm w-full btn-primary text-white font-Roboto mt-2 rounded-[20px] md:h-10"
            >
              Edit
            </label>
            {/* delete button */}
            <label
              id="open-modal"
              htmlFor="modal-delete"
              className="btn btn-sm w-full btn-secondary text-white font-Roboto mt-2 rounded-[20px] md:h-10"
            >
              delete
            </label>
          </div>
        </div>
      </div>

      {/* modal delete*/}
      <input type="checkbox" id="modal-delete" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-3xl text-primary my-3 font-Roboto font-medium">
            delete
          </h3>
          <section>
            <p className="text-black font-Roboto font-medium">
              Are you sure you want to delete this account?
            </p>
            <div className="modal-action font-Roboto">
              <label
                id="btn-delete"
                htmlFor="modal-delete"
                className="btn btn-primary btn-sm w-20 text-white"
                onClick={() => handleDelete()}
              >
                Yes
              </label>
              <label
                htmlFor="modal-delete"
                className="btn btn-secondary btn-sm w-20 text-white"
              >
                No
              </label>
            </div>
          </section>
        </div>
      </div>

      {/* modal edit*/}
      <input type="checkbox" checked={showModal} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-3xl text-primary my-3 font-Roboto font-medium">
            Edit profile
          </h3>
          <section className="w-full">
            <form onSubmit={(e) => handleSubmit(e)}>
              <InputCustom
                id="input-name"
                onChange={(e) => handleChange(e.target.value, "name")}
                type="text"
                value={objSubmit.name}
              />
              <InputCustom
                id="input-email"
                onChange={(e) => handleChange(e.target.value, "email")}
                type="email"
                value={objSubmit.email}
              />
              <InputCustom
                id="input-phone"
                onChange={(e) => handleChange(e.target.value, "phone")}
                type="number"
                value={objSubmit.phone}
              />
              <InputCustom
                id="input-address"
                onChange={(e) => handleChange(e.target.value, "address")}
                type="text"
                value={objSubmit.address}
              />
              <AddButton id="btn-edit" title="edit" loading={loading} />
            </form>
            <label
              id="btn-cancel"
              onClick={() => {
                setShowModal(false);
                setObjSubmit(data);
              }}
              className={
                loading
                  ? "btn btn-sm btn-secondary w-full text-white shadow-lg font-Roboto mt-2 btn-square loading rounded-[20px] md:h-10"
                  : "btn btn-sm btn-secondary w-full text-white shadow-lg font-Roboto mt-2 rounded-[20px] md:h-10"
              }
            >
              {loading ? "" : "Cancel"}
            </label>
          </section>
        </div>
      </div>
    </>
  );
};

export default Profile;
