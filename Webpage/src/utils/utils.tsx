
export const getInstituteName = (id: number | undefined, institutes: { id: number; name: string }[]) => {
    if (!id) return '—';
    const institute = institutes.find((inst) => inst.id === id);
    return institute ? institute.name : 'Не найден';
};

export const getGroupName = (id: number | undefined, groups: { id: number; group_code: string }[]) => {
    if (!id) return '—';
    const group = groups.find((grp) => grp.id === id);
    return group ? group.group_code : 'Не найден';
};
