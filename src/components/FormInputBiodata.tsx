import React, { useState } from 'react';
import { getUserData } from '../utils/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Biodata {
  id: string;
  positionApplied?: string;
  fullName?: string;
  gender?: string;
  birthDetails?: string;
  address?: string;
  phone?: string;
  email?: string;
  pendidikanTerakhir?: {
    create: PendidikanTerakhir;
  };
  riwayatPelatihan?: {
    create: RiwayatPelatihan[];
  };
  riwayatPekerjaan?: {
    create: RiwayatPekerjaan[];
  };
}

interface PendidikanTerakhir {
  name?: string;
  educationLevel?: string;
  major?: string;
  graduationYear?: number;
}

interface RiwayatPelatihan {
  name?: string;
  certificate?: string;
  year?: number;
}

interface RiwayatPekerjaan {
  industry?: string;
  name?: string;
  salary?: number;
  year?: number;
}

interface User {
  id: string;
  email: string;
  // Tambahkan properti lain yang diperlukan
}

interface FormInputBiodataProps {
  user: User;
}

const FormInputBiodata: React.FC<FormInputBiodataProps> = ({ user }) => {
  const [biodata, setBiodata] = useState<Biodata>({
    id: user.id,
    positionApplied: '',
    fullName: '',
    gender: 'UNKNOWN',
    birthDetails: '',
    address: '',
    phone: '',
    email: '',
    pendidikanTerakhir: {
      create: {
        name: '',
        educationLevel: '',
        major: '',
        graduationYear: undefined,
      },
    },
    riwayatPelatihan: {
      create: [],
    },
    riwayatPekerjaan: {
      create: [],
    },
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBiodata((prevBiodata) => {
      if (name.startsWith('pelatihan_')) {
        const fieldName = name.replace('pelatihan_', '');
        return {
          ...prevBiodata,
          riwayatPelatihan: {
            create: [
              {
                ...prevBiodata.riwayatPelatihan?.create[0],
                [fieldName]: fieldName === 'year' ? Number(value) : value,
              },
            ],
          },
        };
      } else if (name.startsWith('pekerjaan_')) {
        const fieldName = name.replace('pekerjaan_', '');
        return {
          ...prevBiodata,
          riwayatPekerjaan: {
            create: [
              {
                ...prevBiodata.riwayatPekerjaan?.create[0],
                [fieldName]:
                  fieldName === 'salary' || fieldName === 'year'
                    ? Number(value)
                    : value,
              },
            ],
          },
        };
      } else if (name.startsWith('pendidikan_')) {
        const fieldName = name.replace('pendidikan_', '');
        return {
          ...prevBiodata,
          pendidikanTerakhir: {
            create: {
              ...prevBiodata.pendidikanTerakhir?.create,
              [fieldName]:
                fieldName === 'graduationYear' ? Number(value) : value,
            },
          },
        };
      } else {
        return {
          ...prevBiodata,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/biodata',
        biodata,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response) {
        throw new Error('Network response was not ok');
      }

      // console.log('🚀 ~ handleSubmit ~ biodata:', biodata);

      const result = await response.data;
      console.log('Success:', result);
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
    console.log('🚀 ~ handleSubmit ~ biodata:', biodata);
  };

  return (
    <div>
      <div>
        <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Biodata
          </h1>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="positionApplied"
              id="floating_position"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={biodata.positionApplied}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="floating_position"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Position Applied
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="fullName"
              id="fullName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={biodata.fullName}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="fullName"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="block text-sm text-gray-500 dark:text-gray-400">
              Gender
            </label>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                name="gender"
                id="gender_male"
                value="MALE"
                className="mr-2"
                checked={biodata.gender === 'MALE'}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="gender_male"
                className="mr-4 text-sm text-gray-900 dark:text-white"
              >
                Male
              </label>
              <input
                type="radio"
                name="gender"
                id="gender_female"
                value="FEMALE"
                className="mr-2"
                checked={biodata.gender === 'FEMALE'}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="gender_female"
                className="mr-4 text-sm text-gray-900 dark:text-white"
              >
                Female
              </label>
            </div>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="birthDetails"
              id="floating_birth_details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={biodata.birthDetails}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="floating_birth_details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Place, Date of Birth
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="address"
              id="floating_address"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={biodata.address}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="floating_address"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={biodata.phone}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={biodata.email}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email Address
            </label>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Last Education
          </h1>
          <div className="grid md:grid-cols-2 md:gap-y-0 md:gap-x-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="pendidikan_name"
                id="floating_institution_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={biodata.pendidikanTerakhir?.create.name}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="floating_institution_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Institution Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="pendidikan_educationLevel"
                id="floating_last_level"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={biodata.pendidikanTerakhir?.create.educationLevel}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="floating_last_level"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last level of education
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="pendidikan_major"
                id="floating_field_of_study"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={biodata.pendidikanTerakhir?.create.major}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="floating_field_of_study"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Field of Study
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="pendidikan_graduationYear"
                id="floating_graduation_year"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={biodata.pendidikanTerakhir?.create.graduationYear || ''}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="floating_graduation_year"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Graduation Year
              </label>
            </div>
          </div>

          {/* Form Riwayat Pelatihan */}
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Training History
          </h1>
          <div className="grid md:grid-cols-2 md:gap-y-0 md:gap-x-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="pelatihan_name"
                id="floating_name_of_training"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={biodata.riwayatPelatihan?.create[0]?.name || ''}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="floating_name_of_training"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name of Training
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="pelatihan_certificate"
                id="floating_certificate"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={biodata.riwayatPelatihan?.create[0]?.certificate || ''}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="floating_certificate"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Certificate (Yes/No)
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="pelatihan_year"
                id="floating_graduation_year"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={biodata.riwayatPelatihan?.create[0]?.year || ''}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="floating_graduation_year"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Year
              </label>
            </div>
          </div>

          {/* Form Riwayat Pekerjaan */}
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Employment History
          </h1>
          <div className="grid md:grid-cols-2 md:gap-y-0 md:gap-x-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="pekerjaan_industry"
                id="floating_name_of_industry"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={biodata.riwayatPekerjaan?.create[0]?.industry || ''}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="floating_name_of_industry"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name of Industry
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="pekerjaan_name"
                id="floating_last_position"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={biodata.riwayatPekerjaan?.create[0]?.name || ''}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="floating_last_position"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last Position
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="pekerjaan_salary"
                id="floating_salary"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={biodata.riwayatPekerjaan?.create[0]?.salary || ''}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="floating_salary"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Salary
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="pekerjaan_year"
                id="floating_year"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={biodata.riwayatPekerjaan?.create[0]?.year || ''}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="floating_year"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Year
              </label>
            </div>
          </div>
          <br />

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>

      <br />
    </div>
  );
};

export default FormInputBiodata;
