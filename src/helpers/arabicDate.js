export const arabicDate = (date = '') => {
    return new Date(date || '').toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
}