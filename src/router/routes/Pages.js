import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Faq = lazy(() => import('../../views/pages/faq'))
const ApiKey = lazy(() => import('../../views/pages/api-key'))
const Profile = lazy(() => import('../../views/pages/profile'))
const Pricing = lazy(() => import('../../views/pages/pricing'))
const License = lazy(() => import('../../views/pages/license'))
const Error = lazy(() => import('../../views/pages/misc/Error'))
const BlogList = lazy(() => import('../../views/pages/blog/list'))
const BlogEdit = lazy(() => import('../../views/pages/blog/edit'))
const BlogDetails = lazy(() => import('../../views/pages/blog/details'))
const ComingSoon = lazy(() => import('../../views/pages/misc/ComingSoon'))
const ModalExamples = lazy(() => import('../../views/pages/modal-examples'))
const Maintenance = lazy(() => import('../../views/pages/misc/Maintenance'))
const AccountSettings = lazy(() => import('../../views/pages/account-settings'))
const NotAuthorized = lazy(() => import('../../views/pages/misc/NotAuthorized'))
const KnowledgeBase = lazy(() => import('../../views/pages/knowledge-base/KnowledgeBase'))
const KnowledgeBaseCategory = lazy(() => import('../../views/pages/knowledge-base/KnowledgeBaseCategory'))
const KBCategoryQuestion = lazy(() => import('../../views/pages/knowledge-base/KnowledgeBaseCategoryQuestion'))
const Transacciones = lazy(() => import('../../views/pages/Transacciones'))
const Reportes = lazy(() => import('../../views/pages/Reportes'))
const Archivos = lazy(() => import('../../views/pages/Reporte-Archivos'))
const Embarques = lazy(() => import('../../views/pages/Embarques'))
const TransaccionesIngenios = lazy(() => import('../../views/pages/Transacciones-Ingenios'))
const HomeImportador = lazy(() => import('../../views/pages/HomeImportador'))
const Usuarios = lazy(() => import('../../views/pages/Admin/Usuarios'))
const SubirArchivos = lazy(() => import('../../views/pages/Admin/Subir-Archivos'))
const ActualizarArchivos = lazy(() => import('../../views/pages/Admin/actualizar-archivos'))
const AdminProductos = lazy(() => import('../../views/pages/Admin/Admin-Productos'))
const Monitoreo = lazy(() => import('../../views/pages/Admin/Monitoreo'))
const AdmEmbarquesBitacora = lazy(() => import('../../views/pages/Admin/Admin-Embarques-Bitacora'))
const AdmEmbarques = lazy(() => import('../../views/pages/Admin/Admin-Embarques'))
const ImportadorBarcos = lazy(() => import('../../views/pages/Importador-Barcos'))
const ImportadorReportesTransacciones = lazy(() => import('../../views/pages/Importador-Reportes-transacciones'))
const Logout = lazy(() => import('../../views/pages/Admin/Utils'))

const PagesRoutes = [
  {
    path: '/pages/profile',
    element: <Profile />
  },
  {
    path: '/pages/faq',
    element: <Faq />
  },
  {
    path: '/pages/knowledge-base',
    element: <KnowledgeBase />
  },
  {
    path: '/pages/knowledge-base/:category',
    element: <KnowledgeBaseCategory />
  },
  {
    path: '/pages/knowledge-base/:category/:question',
    element: <KBCategoryQuestion />
  },
  {
    path: '/pages/account-settings',
    element: <AccountSettings />
  },
  {
    path: '/pages/license',
    element: <License />
  },
  {
    path: '/pages/api-key',
    element: <ApiKey />
  },
  {
    path: '/pages/modal-examples',
    element: <ModalExamples />
  },
  {
    path: '/pages/blog/list',
    element: <BlogList />
  },
  {
    path: '/pages/blog/detail/:id',
    element: <BlogDetails />
  },
  {
    path: '/pages/blog/detail',
    element: <Navigate to='/pages/blog/detail/1' />
  },
  {
    path: '/pages/blog/edit/:id',
    element: <BlogEdit />
  },
  {
    path: '/pages/blog/edit',
    element: <Navigate to='/pages/blog/edit/1' />
  },
  {
    path: '/pages/pricing',
    element: <Pricing />
  },
  {
    path: '/misc/coming-soon',
    element: <ComingSoon />,
    meta: {
      publicRoute: true,
      layout: 'blank'
    }
  },
  {
    path: '/misc/not-authorized',
    element: <NotAuthorized />,
    meta: {
      publicRoute: true,
      layout: 'blank'
    }
  },
  {
    path: '/misc/maintenance',
    element: <Maintenance />,
    meta: {
      publicRoute: true,
      layout: 'blank'
    }
  },
  {
    path: '/misc/error',
    element: <Error />,
    meta: {
      publicRoute: true,
      layout: 'blank'
    }
  },
  {
    path: '/Transacciones',
    element: <Transacciones />
  },
  {
    path: '/Reportes',
    element: <Reportes />
  },
  {
    path: '/Reportes-Archivos',
    element: <Archivos />
  },
  {
    path: '/Embarques',
    element: <Embarques />
  },
  {
    path: '/Transacciones-Ingenios',
    element: <TransaccionesIngenios />
  },
  {
    path: '/Importador-Home',
    element: <HomeImportador />
  },
  {
    path: '/Importador-Barcos',
    element: <ImportadorBarcos/>
  },
  {
    path: '/Importador-Reportes-Transacciones/:producto/:estado',
    element: <ImportadorReportesTransacciones/>
  },
  {
    path: '/Importador-Reportes-Transacciones/',
    element: <ImportadorReportesTransacciones/>
  },
  {
    path: '/admin/modificar-usuarios',
    element: <Usuarios />
  },
  {
    path: '/admin/subir-archivos',
    element: <SubirArchivos />
  },
  {
    path: '/admin/actualizar-archivos',
    element: <ActualizarArchivos />
  },
  {
    path: '/admin/productos',
    element: <AdminProductos />
  },
  {
    path: '/admin/monitoreo',
    element: <Monitoreo />
  },
  {
    path: '/admin/embarques-bitacora',
    element: <AdmEmbarquesBitacora />
  },
  {
    path: '/admin/embarques',
    element: <AdmEmbarques/>
  },
  {
    path: '/cerrar-sesion',
    element: <Logout/>
  }

]

export default PagesRoutes
