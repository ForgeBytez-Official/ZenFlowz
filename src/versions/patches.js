// Patch Repository - Source of truth for release content
import { PATCH_HISTORY } from './history';

const parse = (v) => v.split('-')[0].split('.').map(Number);

export const PATCH_RECORDS = [...PATCH_HISTORY].sort((a, b) => {
    const pa = parse(a.version);
    const pb = parse(b.version);
    
    for (let i = 0; i < 3; i++) {
        if (pa[i] > pb[i]) return -1;
        if (pa[i] < pb[i]) return 1;
    }
    return 0;
});

