import { useMemo } from 'react';
import { useRouter } from 'next/router'
import { stringify } from 'querystring';

export function useLinkWithQuery(pathname: string) {
    const router = useRouter()
    // The equivalent of `location.search` from remix-run/history (as used by react-router)
    // https://github.com/remix-run/history/blob/main/docs/api-reference.md#locationsearch
    const search = '?' + stringify(router.query)
    return useMemo(() => ({ pathname, search }), [pathname, search]);
}
