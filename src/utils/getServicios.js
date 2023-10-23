import clienteAxios from '@/config/axios'

export const getServicios = (async () => {

  const res = await clienteAxios.get(`/api/servicios`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
  })
  return res.data.data
})