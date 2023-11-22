// DashboardPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/DashboardPage.css';
import { NavBar } from '../components/NavBar';
import '../pages/styles/SideBar.css'
import Sidebar from '../components/SideBar';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';

function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
  const [editUser, setEditUser] = useState({ _id: null, username: '', email: '', password: '' });


  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditUser({ _id: null, username: '', email: '', password: '' });
  };




  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post('http://localhost:4000/api/register', {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
      });
      setNewUser({ username: '', email: '', password: '' });
      handleCloseModal();
      fetchUsers();
      Swal.fire(
        '¡Agregado!',
        'El usuario ha sido agregado correctamente.',
        'success'
      );
    } catch (error) {
      console.error('Error al agregar usuario:', error.response.data);
      Swal.fire(
        'Error',
        'No se pudo agregar el usuario.',
        'error'
      );
    }
  };

  const handleEditClick = (user) => {
    setEditUser({ _id: user._id, username: user.username, email: user.email, password: '' });
    handleShowEditModal();
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/users/${editUser._id}`, {
        username: editUser.username,
        email: editUser.email,
        password: editUser.password,
      });
      handleCloseEditModal();
      fetchUsers();
      Swal.fire(
        '¡Actualizado!',
        'El usuario ha sido actualizado correctamente.',
        'success'
      );
    } catch (error) {
      console.error('Error al actualizar usuario:', error.response.data);
      Swal.fire(
        'Error',
        'No se pudo actualizar el usuario.',
        'error'
      );
    }
  };


const handleDelete = async (userId) => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esta acción!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar!'
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`http://localhost:4000/api/users/${userId}`);
      Swal.fire(
        'Eliminado!',
        'El usuario ha sido eliminado.',
        'success'
      );
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar usuario:', error.response.data);
      Swal.fire(
        'Error!',
        'No se pudo eliminar el usuario.',
        'error'
      );
    }
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="main-container"> {/* Contenedor principal con Flexbox */}
      <Sidebar/>
      <div className='dashboard-container'>
        <div className='dashboard-card'>
          <h1 className='dashboard-title'>Mi Dashboard Personalizado</h1>
          <button onClick={handleShowModal} className='action-button'>
              Agregar Usuario
            </button>

            {/* El Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Agregar Usuario</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Formulario para agregar usuario */}
                <div className='form-container'>
                  <input
                    type='text'
                    placeholder='Nombre de usuario'
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    className='input-field'
                  />
                  <input
                    type='email'
                    placeholder='Email'
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className='input-field'
                  />
                  <input
                    type='password'
                    placeholder='Contraseña'
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className='input-field'
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Cerrar
                </Button>
                <Button variant="primary" onClick={() => {
                  handleAddUser();
                  handleCloseModal();
                }}>
                  Guardar Usuario
                </Button>
              </Modal.Footer>
            </Modal>
          <table className='user-table'>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Email</th>
                <th>Contraseña</th>
                <th>Fecha de creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.createdAt}</td>
                  <td>
                    <button onClick={() => handleDelete(user._id)} className='delete-button'>
                      Eliminar
                    </button>
                    <button onClick={() => handleEditClick(user)} className='edit-button'>
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal show={showEditModal} onHide={handleCloseEditModal}>
  <Modal.Header closeButton>
    <Modal.Title>Editar Usuario</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div className='form-container'>
      <input
        type='text'
        placeholder='Nombre de usuario'
        value={editUser.username}
        onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
        className='input-field'
      />
      <input
        type='email'
        placeholder='Email'
        value={editUser.email}
        onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
        className='input-field'
      />
      <input
        type='password'
        placeholder='Contraseña'
        value={editUser.password}
        onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
        className='input-field'
      />
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseEditModal}>
      Cerrar
    </Button>
    <Button variant="primary" onClick={handleUpdateUser}>
      Actualizar Usuario
    </Button>
  </Modal.Footer>
</Modal>

        </div>
      </div>
      </div>
    </div>
  );
}

export default DashboardPage;
