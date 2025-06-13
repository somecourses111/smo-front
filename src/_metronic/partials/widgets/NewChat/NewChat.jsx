import React from 'react'
import Swal from 'sweetalert2';
import axiosInstance from '../../../../app/api/axios';
import { NewChatMessage } from './NewChatMessage';

export const NewChat = ({get_data , endpoint , data}) => {

    const Delete = (id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert ",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          showLoaderOnConfirm: true,
          preConfirm: async (login) => {
            try {
              const { data } = await axiosInstance.delete(`${endpoint}/${id}`);
              if (!data || data.length === 0) {
                throw new Error(JSON.stringify(data));
              }
              get_data()
            } catch (error) {
              Swal.showValidationMessage(`
                          Request failed: ${error}
                      `);
            }
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Done!",
              icon: "success"
            });
          }
        });
    
    }

  return (
    <div className="card p-4">
        {data.map((row,key)=>(
            <NewChatMessage Delete={Delete} item={row} endpoint={endpoint} key={key} />
        ))}
        
    </div>
  )
}
