// ** Icons Import
import { Server, Grid, Anchor, Circle, Home, Truck, User, Clipboard, FilePlus, File, Users } from 'react-feather'
//import { getUserData } from '@utils'

// const user = ''
// if (getUserData) {
//    user = getUserData()
// }


export default [
  /*{
    id: 'tablesReactstrap',
    title: 'Table',
    icon: <Server size={20} />,
    navLink: '/tables/reactstrap'
  },*/
  /*{
    id: 'dataTable',
    title: 'DataTable',
    icon: <Grid size={20} />,
    children: [
      {
        id: 'dtBasic',
        title: 'Basic',
        icon: <Circle size={12} />,
        navLink: '/datatables/basic'
      },
      {
        id: 'dtAdvance',
        title: 'Advanced',
        icon: <Circle size={12} />,
        navLink: '/datatables/advance'
      }
    ]
  },*/
  {
    id: 'analyticsDash',
    title: 'Home',
    icon: null, /* <Home /> */
    navLink: '/dashboard/analytics',
    role:['Máster Exportador', 'Exportador']
  },
  {
    id: 'Reportes',
    title: 'Reportes',
    icon: <Clipboard />,
    navLink: '/Reportes',
    role:['Máster Exportador', 'Exportador'],
    children: [
      {
        id: 'dtBasic',
        title: 'Cuotas',
        icon: <Circle size={12} />,
        navLink: '/Reportes'
      },
      {
        id: 'dtAdvance',
        title: 'Archivos ',
        icon: <Circle size={12} />,
        navLink: '/Reportes-Archivos'
        
      }
    ]
  },
  {
    id: 'Transacciones',
    title: 'Transacciones',
    icon: <Truck />,
    navLink: '/Transacciones',
    role:['Máster Exportador', 'Exportador'],
    children: [
      {
        id: 'Transacciones-Ingenios',
        title: 'Transacciones/Ing',
        icon: <Circle size={12} />,
        navLink: '/Transacciones-Ingenios'
      },
      {
        id: 'Transacciones',
        title: 'Transacciones ',
        icon: <Circle size={12} />,
        navLink: '/Transacciones'
      }
    ]
  },
  {
    id: 'Embarques',
    title: 'Embarques',
    icon: <Anchor />,
    navLink: '/Embarques',
    role:['Máster Exportador', 'Exportador']
  },
  

  //Importador
  {
    id: 'HomeImp',
    title: 'Home',
    icon: <Home />,
    navLink: '/Importador-Home',
    role:['Máster Importador', 'Importador']
  },

  // Barcos 
  {
    id: 'ImportadorBarcos',
    title: 'Barcos',
    icon: <Anchor />,
    navLink: '/Importador-Barcos',
    role:['Máster Importador', 'Importador']
  },

  // Reportes Transacciones
  {
    id: 'ImportadorReportesTransacciones',
    title: "Transacciones",
    icon: <File />,
    navLink: '/Importador-Reportes-Transacciones',
    role:['Máster Importador', 'Importador']
  },


  //Admin Usuarios
  {
    id: 'AdminUsers',
    title: 'Administrar Usuarios',
    icon: <User size={20} />,
    navLink: '/Transacciones',
    role:['Administrador'],
    children: [
       {
        id: 'UsuariosCrud',
        title: 'Modificar Usuarios',
        icon: <User />,
        navLink: '/admin/modificar-usuarios',
        role:['admin']
      },

      //SubirArchivos
      {
        id: 'SubirArchivos',
        title: 'Subir Archivos',
        icon: <FilePlus />,
        navLink: '/admin/subir-archivos',
        role:['admin']
      },
      // ActualizarArchivos
      {
        id: 'ActualizarArchivos',
        title: 'Actualizar Archivos',
        icon: <File />,
        navLink: '/admin/actualizar-archivos',
        role:['Administrador']
      },
      {
        id: 'AdminProductos',
        title: 'Admin Productos',
        icon: <File />,
        navLink: '/admin/productos',
        role:['Administrador']
      },
      // Monitoreo
      {
        id: 'Monitoreo',
        title: 'Monitoreo',
        icon: <File />,
        navLink: '/admin/monitoreo',
        role:['Administrador']
      }
    ]
  },

  {
    id: 'AdmEmbarques',
    title: 'Embarques',
    icon: <Anchor />,
    navLink: '/admin/embarque',
    role:['Administrador', 'Electricista'],
    children: [
      //Bitácora
      {
        id: 'AdmEmbarques',
        title: 'Admin Embarques',
        icon: <FilePlus />,
        navLink: '/admin/embarques',
        role:['admin']
      },
      {
        id: 'AdmEmbarquesBitacora',
        title: 'Bítacora',
        icon: <User />,
        navLink: '/admin/embarques-bitacora',
        role:['admin']
      }
    ]
  },

    // Panel
    {
      id: 'Portales',
      title: "Portales",
      icon: <Users />,
      navLink: '/admin/Panel',
      role:['Administrador']
    }


  // Configuracion de usuario
  // {
  //   id: 'Usuario',
  //   title: 'usuario',
  //   icon: <User size={20} />,
  //   navLink: '/pages/account-settings',
  //   role:['Máster Exportador', 'Exportador', 'Máster Importador', 'Importador', 'Administrador', 'Electricista'],
  //   children: [
  //     {
  //       id: 'usersettings',
  //       title: 'Cambiar Contraseña',
  //       icon: <Circle size={12} />,
  //       navLink: '/pages/account-settings'
  //     },
  //     {
  //       id: 'cerrarsesion',
  //       title: 'Salir',
  //       icon: <Circle size={12} />,
  //       navLink: '/cerrar-sesion'
  //     }
  //   ]
  // }
]
