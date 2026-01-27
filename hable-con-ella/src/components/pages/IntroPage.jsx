import { useNavigate } from 'react-router-dom'
import Button from '../common/Button'

const IntroPage = () => {
  const navigate = useNavigate()
  return (
    <>
     <h1>Hable con Ella</h1>
     <Button
      variant='primary'
      size='lg'
      onClick={() => navigate('/categories')}
     >
      Empezer
    </Button>
    </>
  )
}

export default IntroPage