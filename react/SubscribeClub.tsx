import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Button, Input, Modal } from 'vtex.styleguide'

import { useToast } from './components/common/hooks'
import { apiRequestFactory, withQueryClient } from './service'
import type { InputUser, User } from './typings'

function SubscribeClub() {
  const { showToast } = useToast()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState<InputUser>({
    code: '',
    name: '',
    email: '',
  })

  const { mutate, isLoading } = useMutation<User, Error, InputUser>({
    mutationFn: (input) =>
      apiRequestFactory<User>({
        url: '/_v/shopping-club-vtex-io/subscribe-club',
        method: 'POST',
        body: input,
      })(),
    onSuccess: () => {
      showToast({ message: 'Inscrição realizada com sucesso!' })
      setFormData({ code: '', name: '', email: '' })
      setIsModalOpen(false)
    },
    onError(error) {
      console.error('Error subscribing to club:', error)

      showToast({
        message: `Ocorreu um erro ao se inscrever no clube: ${error.message}`,
      })
    },
  })

  const handleSubmit = () => {
    mutate(formData)
  }

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Inscrição no Clube</Button>

      <Modal
        isOpen={isModalOpen}
        title="Inscrição no Clube de Compras"
        onClose={() => setIsModalOpen(false)}
      >
        <div className="pa5">
          <div className="mb4">
            <Input
              label="Código de Indicação"
              value={formData.code}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, code: e.target.value })
              }
            />
          </div>

          <div className="mb4">
            <Input
              label="Nome"
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="mb4">
            <Input
              label="E-mail"
              type="email"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={isLoading}
            >
              Inscrever-se
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default withQueryClient(SubscribeClub)
