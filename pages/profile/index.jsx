import Navbar from "../../components/Navbar";
import { AddButton, DeleteButton } from "../../components/CustomButton";
import InputCustom from "../../components/InputCustom";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center">
        <div className="h-1/2 ">
          {/* judul */}
          <h1 className="text-left mb-6 text-black font-Roboto font-semibold text-[30px] md:text-[50px]">
            My Profile
          </h1>

          {/* form */}
          <div>
            <div className="flex items-center justify-between">
              <label className="font-Roboto text-black font-normal mr-5 text-lg md:mr-10">
                Shop Name
              </label>
              <InputCustom
                type="text"
                placeholder="Name shop"
                value="toko jaya abadi"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-Roboto text-black font-normal mr-5 text-lg">
                Email
              </label>
              <InputCustom
                type="text"
                placeholder="Name shop"
                value="tokojayaabadi@gomail.com"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-Roboto text-black font-normal mr-5 text-lg">
                Phone Number
              </label>
              <InputCustom
                type="number"
                placeholder="Phone number"
                value="341478745"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-Roboto text-black font-normal mr-5 text-lg">
                Address
              </label>
              <InputCustom
                type="text"
                placeholder="Address"
                value="Jalan delima"
              />
            </div>
          </div>

          {/* button */}
          <div className="flex flex-col items-center mt-6">
            <AddButton title="Edit" />
            <DeleteButton title="delete" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
