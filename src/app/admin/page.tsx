"use client";
import AdminLayout from "@/app/components/AdminLayout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config";

const AdminPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/user/atk`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <AdminLayout>
      <div className="overflow-x-auto bg-white rounded-lg">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Username</th>
              <th>Release Date</th>
              <th>Result Photo</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <th>{index + 1}</th>
                <td>{item.username}</td>
                <td>{new Date(item.release_date).toLocaleDateString()}</td>
                <td>
                  <div
                    className="w-32 h-10 relative"
                    onClick={() => {
                      setSelectedItem(item);
                      const modal = document.getElementById(
                        "my_modal_3"
                      ) as HTMLDialogElement;
                      if (modal) modal.showModal();
                    }}
                  >
                    <Image
                      src={`http://nestjs:4000${item.image_url}`}
                      alt="Result"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                </td>
                <td>
                  <div
                    className={`badge ${
                      item.result === 0 ? "badge-error" : "badge-success"
                    }`}
                  >
                    {item.result === 0 ? "Negative" : "Positive"}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box w-[30%]">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Reuslt Photo</h3>
            <div className="flex items-center justify-center h-64 relative">
              {selectedItem && (
                <Image
                  src={`http://nestjs:4000${selectedItem.image_url}`}
                  alt="Result"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              )}
            </div>
          </div>
        </dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
