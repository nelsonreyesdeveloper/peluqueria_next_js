import clienteAxios from '@/config/axios'
import Cookies from 'js-cookie'
export const getServicios = (async () => {

  const res = await clienteAxios.get(`/api/servicios`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`
    },
  })
  return res.data.data
})