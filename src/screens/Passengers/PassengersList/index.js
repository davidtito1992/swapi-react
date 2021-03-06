import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import {
  selectPassengers,
  selectPassengersError,
  selectPassengersLoading,
  fetchPassengers,
} from '../../../slices/passengersSlice'
import LoadingSpinner from '../../../components/LoadingSpinner'
import Error from '../../../components/ui/ErrorComponent'
import Passenger from '../Passenger'
import InputSearch from '../InputSearch'

const PassengersList = () => {
  const loading = useSelector(selectPassengersLoading)
  const error = useSelector(selectPassengersError)
  const iData = useSelector(selectPassengers)
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const data =
    search === ''
      ? iData
      : iData?.filter((passenger) =>
          passenger?.name?.toLowerCase()?.includes(search)
        )

  useEffect(() => {
    dispatch(fetchPassengers(1))
  }, [dispatch])

  const renderRow = (item) => <Passenger key={item.name} item={item} />

  if (loading) {
    return <LoadingSpinner>Cargando resultados</LoadingSpinner>
  }

  if (error && (data == null || data?.length === 0)) {
    return <Error message={error} />
  }

  return (
    <Container>
      {data && <InputSearch onSearch={setSearch} />}
      {data?.map(renderRow)}
      {error && <Error message={error} />}
      {data?.length === 0 && (
        <Empty>
          <span>No hay información para mostrar.</span>
        </Empty>
      )}
    </Container>
  )
}

export default PassengersList

/**
 * Styles
 */

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
`
const Empty = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0px;
`
