import {FaTrash} from 'react-icons/fa';
import {useMutation} from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';


export default function ClientRow({client})
{   const [deleteClient] = useMutation(DELETE_CLIENT,{
           variables:{id:client.id},
           //refetchQueries:[{query:GET_CLIENTS}],
           //not always ok to refetch queries another way is to update cach

           update(cache,{data:{deleteClient}})
           {
             const {clients} =cache.readQuery({query:GET_CLIENTS});
             cache.writeQuery({
                query:GET_CLIENTS,
                data:{clients:clients.filter(client => client.id !== deleteClient.id)},
             });
           }
           //set response wich is delete clients 
});
    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className ="btn btn-danger btn-sm" onClick={deleteClient}>
                   
                   <FaTrash></FaTrash>
                </button>
            </td>
        </tr>
    )
}