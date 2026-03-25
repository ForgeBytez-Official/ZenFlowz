// Version Orchestrator - Handles patch note structure and versioning API
import { PATCH_RECORDS } from './patches';

// Helpers
const parseVersion = (v) => v.split('-')[0].split('.').map(Number);
const cleanVersion = (v) => v.split('-')[0];

const getProjectStatus = (v) => {
    const low = v.toLowerCase();
    if (low.includes('-alpha')) return 'ALPHA';
    if (low.includes('-beta')) return 'BETA';
    return 'STABLE';
};

const getVersionTypeLabel = (type) => {
    if (type === 'major') return 'MAJOR';
    if (type === 'minor') return 'MINOR';
    if (type === 'match') return 'MATCH';
    return type.toUpperCase();
};

/**
 * Automatically builds the hierarchical tree (Major -> Minor -> Match)
 */
const buildVersionTree = (flatList) => {
    const majors = flatList.filter(p => p.type === 'major').map(m => ({ ...m, children: [] }));
    const minors = flatList.filter(p => p.type === 'minor').map(min => ({ ...min, children: [] }));
    const matches = flatList.filter(p => p.type === 'match').map(f => ({ ...f, children: [] }));

    // 1. Link Matches (X.Y.Z) to Minors (X.Y.0) or Majors (X.Y.0 / X.0.0)
    matches.forEach(match => {
        const parts = parseVersion(match.version);
        if (parts[2] !== 0) {
            const parentBase = `${parts[0]}.${parts[1]}.0`;
            const rootBase = `${parts[0]}.0.0`;

            const minorParent = minors.find(m => parseVersion(m.version).join('.') === parentBase);
            if (minorParent) {
                minorParent.children.push(match);
            } else {
                const majorParent = majors.find(m => parseVersion(m.version).join('.') === parentBase)
                    || majors.find(m => parseVersion(m.version).join('.') === rootBase);
                if (majorParent) majorParent.children.push(match);
            }
        }
    });

    // 2. Link Minors (X.Y.0) to Majors (X.0.0)
    const orphanedMinors = [];
    minors.forEach(minor => {
        const parts = parseVersion(minor.version);
        const majorBase = `${parts[0]}.0.0`;
        const parent = majors.find(m => parseVersion(m.version).join('.') === majorBase);
        if (parent) {
            parent.children.push(minor);
        } else {
            orphanedMinors.push(minor);
        }
    });

    const finalTree = [...majors, ...orphanedMinors].sort((a, b) => {
        const pa = parseVersion(a.version);
        const pb = parseVersion(b.version);
        for (let i = 0; i < 3; i++) {
            if (pa[i] !== pb[i]) return pa[i] - pb[i];
        }
        return 0;
    });

    // Helper to inject status info recursively and deduplicate logic
    const injectStatus = (nodes) => {
        nodes.forEach(node => {
            // Logic Improvement: Separate status from version string for clean display
            node.status = getProjectStatus(node.version);
            node.version = cleanVersion(node.version);
            
            if (node.noticeableInfo) {
                node.noticeableInfo = node.noticeableInfo.filter(
                    info => info.label !== "Manifest Status" && info.label !== "Status"
                );
            }

            if (node.children) injectStatus(node.children);
        });
    };
    injectStatus(finalTree);

    return finalTree;
};

// Calculate dynamic roadmap for Briefing
const getRoadmap = () => {
    const sorted = [...PATCH_RECORDS].sort((a, b) => {
        const pa = parseVersion(a.version);
        const pb = parseVersion(b.version);
        for (let i = 0; i < 3; i++) {
            if (pa[i] !== pb[i]) return pa[i] - pb[i];
        }
        return 0;
    });

    const currentIndex = sorted.length - 1;
    const current = sorted[currentIndex];
    const past = currentIndex > 0 ? sorted[currentIndex - 1] : null;

    return {
        past: past ? {
            version: cleanVersion(past.version),
            title: past.title,
            date: past.date,
            summary: past.summary,
            type: getVersionTypeLabel(past.type),
            status: getProjectStatus(past.version)
        } : null,
        current: {
            version: cleanVersion(current.version),
            title: current.title,
            date: current.date,
            summary: current.summary,
            type: getVersionTypeLabel(current.type),
            status: getProjectStatus(current.version)
        },
        next: current.nextPlan || null
    };
};

// Orchestrate the final export
const history = buildVersionTree(PATCH_RECORDS);
const latest = [...PATCH_RECORDS].sort((a, b) => {
    const pa = parseVersion(a.version);
    const pb = parseVersion(b.version);
    for (let i = 0; i < 3; i++) {
        if (pa[i] !== pb[i]) return pb[i] - pa[i];
    }
    return 0;
})[0];

export const VERSION_INFO = {
    current: cleanVersion(latest.version),
    status: getProjectStatus(latest.version),
    type: getVersionTypeLabel(latest.type),
    releaseDate: latest.date,
    githubRepo: "https://github.com/ForgeBytez-Official/ZenFlowz",
    roadmap: getRoadmap(),
    history: history
};



