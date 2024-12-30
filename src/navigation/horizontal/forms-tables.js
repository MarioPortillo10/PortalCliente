// ** Icons Import
import { Edit, Copy, Circle, Box, Package, AlertTriangle, RotateCw, Server, Grid, Home, Truck, User, Clipboard } from 'react-feather'

export default [
  /*{
    id: 'formsAndTable',
    title: 'Menu',
    icon: <Edit />,
    children: [
      {
        id: 'formElements',
        title: 'Form Elements',
        icon: <Copy />,
        children: [
          {
            id: 'input',
            title: 'Input',
            icon: <Circle />,
            navLink: '/forms/elements/input'
          },
          {
            id: 'inputGroup',
            title: 'Input Groups',
            icon: <Circle />,
            navLink: '/forms/elements/input-group'
          },
          {
            id: 'inputMask',
            title: 'Input Mask',
            icon: <Circle />,
            navLink: '/forms/elements/input-mask'
          },
          {
            id: 'textarea',
            title: 'Textarea',
            icon: <Circle />,
            navLink: '/forms/elements/textarea'
          },
          {
            id: 'checkbox',
            title: 'Checkbox',
            icon: <Circle />,
            navLink: '/forms/elements/checkbox'
          },
          {
            id: 'radio',
            title: 'Radio',
            icon: <Circle />,
            navLink: '/forms/elements/radio'
          },
          {
            id: 'switch',
            title: 'Switch',
            icon: <Circle />,
            navLink: '/forms/elements/switch'
          },
          {
            id: 'select',
            title: 'Select',
            icon: <Circle />,
            navLink: '/forms/elements/select'
          },
          {
            id: 'numberInput',
            title: 'Number Input',
            icon: <Circle />,
            navLink: '/forms/elements/number-input'
          },
          {
            id: 'fileUploader',
            title: 'File Uploader',
            icon: <Circle />,
            navLink: '/forms/elements/file-uploader'
          },
          {
            id: 'quillEditor',
            title: 'Editor',
            icon: <Circle />,
            navLink: '/forms/elements/editor'
          },
          {
            id: 'date_&_timePicker',
            title: 'Date & Time Picker',
            icon: <Circle />,
            navLink: '/forms/elements/pickers'
          }
        ]
      },
      {
        id: 'formLayouts',
        title: 'Form Layout',
        icon: <Box />,
        navLink: '/forms/layout/form-layout'
      },
      {
        id: 'wizard',
        title: 'Form Wizard',
        icon: <Package />,
        navLink: '/forms/wizard'
      },
      {
        id: 'formValidation',
        title: 'Form Validation',
        icon: <AlertTriangle size={12} />,
        navLink: '/forms/form-validation'
      },
      {
        id: 'formRepeater',
        title: 'Form Repeater',
        icon: <RotateCw />,
        navLink: '/forms/form-repeater'
      },
      {
        id: 'tablesReactstrap',
        title: 'Table',
        icon: <Server />,
        navLink: '/tables/reactstrap'
      },
      {
        id: 'dataTable',
        title: 'Home',
        icon: <Grid />,
        children: [
          {
            id: 'dtBasic',
            title: 'Basic',
            icon: <Circle />,
            navLink: '/datatables/basic'
          },
          {
            id: 'dtAdvance',
            title: 'Advanced',
            icon: <Circle />,
            navLink: '/datatables/advance'
          }
        ]
      },
      {
        id: 'dtBasic',
        title: 'Home',
        icon: <Server />,
        navLink: '/datatables/basic'
      }

    ]
  }*/
  {
    id: 'analyticsDash',
    title: 'Home',
    icon: <Home />,
    navLink: '/dashboard/analytics'
  },
  {
    id: 'Reportes',
    title: 'Reportes',
    icon: <Clipboard />,
    navLink: '/Reportes',
    children: [
      {
        id: 'dtBasic',
        title: 'Basic',
        icon: <Circle size={12} />,
        navLink: '/tables/reactstrap'
      },
      {
        id: 'dtAdvance',
        title: 'Archivos',
        icon: <Circle size={12} />,
        navLink: '/Reportes-Archivos'
      }
    ]
  },
  {
    id: 'Transacciones',
    title: 'Transacciones',
    icon: <Truck />,
    navLink: '/Transacciones'
  },
  {
    id: 'Embarques',
    title: '/Embarques',
    icon: <Truck />,
    navLink: '/Embarques'
  },
  {
    id: 'Usuario',
    title: 'Usuario',
    icon: <User size={20} />,
    navLink: '/pages/account-settings'
    /*children: [
      {
        id: 'dtBasic',
        title: 'Basic',
        icon: <Circle size={12} />,
        navLink: '/tables/reactstrap'
      },
      {
        id: 'dtAdvance',
        title: 'Advanced',
        icon: <Circle size={12} />,
        navLink: '/forms/form-validation'
      }
    ]*/
  }
  
]
