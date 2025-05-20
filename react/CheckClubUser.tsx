import { useQuery } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import React from 'react'

import { Skeleton } from './components/Skeleton'
import { apiRequestFactory, withQueryClient } from './service'
import type { CheckSessionClubUser } from './typings'

type Props = {
  FallbackElement?: React.FC<unknown>
  fallbackMessage?: string
}

function CheckClubUser({
  children,
  FallbackElement,
  fallbackMessage,
}: PropsWithChildren<Props>) {
  const { data, isLoading } = useQuery<CheckSessionClubUser, Error>({
    queryKey: ['check-session-club-user'],
    queryFn: apiRequestFactory({
      url: '/_v/shopping-club-vtex-io/check-session-club-user',
    }),
  })

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Skeleton height={40} width="100%" minWidth={200} />
      </div>
    )
  }

  if (!data?.isClubUser) {
    if (FallbackElement) {
      return <FallbackElement />
    }

    if (fallbackMessage) {
      return <div className="c-action-primary">{fallbackMessage}</div>
    }

    return null
  }

  return <>{children}</>
}

export default withQueryClient(CheckClubUser)
