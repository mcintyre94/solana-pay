import { useCallback } from 'react';
import { useRouter } from 'next/router';

export function useNavigateWithQuery() {
    const router = useRouter();
    const query = router.query
    return useCallback(
        (pathname: string) => router.push({ pathname, query }),
        [router, query]
    );
}
