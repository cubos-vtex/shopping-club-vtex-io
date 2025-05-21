import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import type { SessionSuccess } from 'vtex.session-client'
import { useRenderSession } from 'vtex.session-client'
import { Button, Input, Modal } from 'vtex.styleguide'

import { useToast } from './components/common/hooks'
import { apiRequestFactory, withQueryClient } from './service'
import type { InputUser, User } from './typings'

const SUCCESS_MESSAGE = 'Inscrição realizada com sucesso.'

function SubscribeClub() {
  const { showToast } = useToast()
  const { session } = useRenderSession() as { session: SessionSuccess }
  const sessionEmail = session?.namespaces?.profile?.email?.value

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState<InputUser>({
    code: '',
    name: '',
    email: '',
  })

  const { mutate, isLoading } = useMutation<User, Error, InputUser>({
    mutationFn: (input) =>
      apiRequestFactory<User>({
        url: '/_v/shopping-club-vtex-io/users',
        method: 'POST',
        body: input,
      })(),
    onSuccess: (data) => {
      setFormData({ code: '', name: '', email: '' })
      setIsModalOpen(false)

      if (sessionEmail === data.email) {
        showToast(
          `${SUCCESS_MESSAGE} A página será atualizada para carregar o seu perfil de membro do clube.`
        )

        window.setTimeout(() => window.location.reload(), 3000)
      } else {
        showToast(
          `${SUCCESS_MESSAGE} Faça login com o e-mail ${data.email} para acessar o clube.`
        )
      }
    },
    onError(error, variables) {
      console.error('Error subscribing to club:', error)

      let errorMessage = `Ocorreu um erro ao se inscrever no clube: ${error.message}`

      if (error.message.includes('Missing required fields: ')) {
        const [, fields] = error.message.split(': ')
        const missingFields = fields.split(', ').map((field) => {
          switch (field) {
            case 'code':
              return 'Código de Indicação'

            case 'name':
              return 'Nome'

            case 'email':
              return 'E-mail'

            default:
              return field
          }
        })

        errorMessage = `Campos obrigatórios não foram preenchidos: ${missingFields.join(
          ', '
        )}`
      } else if (error.message.includes('Invalid email')) {
        errorMessage = `O email inserido é inválido: ${variables.email}`
      } else if (error.message.includes('already exists')) {
        errorMessage = `Já existe um usuário com o e-mail ${variables.email}`
      }

      showToast(errorMessage)
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
