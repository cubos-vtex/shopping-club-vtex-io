import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { Button } from 'vtex.styleguide'

import { useToast } from './components/common/hooks'
import { apiRequestFactory, withQueryClient } from './service'
import type { InputUser, User } from './typings'

function SubscribeClub() {
  const { showToast } = useToast()

  const { mutate, isLoading } = useMutation<User, Error, InputUser>({
    mutationFn: (input) =>
      apiRequestFactory<User>({
        url: '/_v/shopping-club-vtex-io/subscribe-club',
        method: 'POST',
        body: input,
      })(),
    onError(error) {
      console.error('Error subscribing to club:', error)

      showToast({
        message: `Ocorreu um erro ao se inscrever no clube: ${error.message}`,
      })
    },
  })

  // o console.log abaixo está aqui por enquanto só para não dar erro do eslint de variáveis não usadas

  // eslint-disable-next-line no-console
  console.log({ mutate, isLoading })

  // o onClick do botão abaixo deve abrir um modal com o formulário de inscrição
  // então no modal deve ter um botão que chama a função mutate com os dados do formulário (code, name e email)
  // usar o isLoading no botão do modal para indicar quando o cadastro está sendo feito
  // pode usar os textos em pt-BR mesmo: Código, Nome e E-mail
  // o botão do modal pode ter o texto "Inscrever-se"

  return <Button>Inscrição no Clube</Button>
}

export default withQueryClient(SubscribeClub)
