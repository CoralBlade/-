document.addEventListener('DOMContentLoaded', () => {
    const hoverables = document.querySelectorAll('.hoverable');

    hoverables.forEach(hoverable => {
        hoverable.addEventListener('mouseover', () => {
            const pair = hoverable.closest('.sentence-pair');
            pair.querySelectorAll('.hoverable').forEach(el => {
                el.classList.add('highlight');
            });
        });

        hoverable.addEventListener('mouseout', () => {
            const pair = hoverable.closest('.sentence-pair');
            pair.querySelectorAll('.hoverable').forEach(el => {
                el.classList.remove('highlight');
            });
        });
    });
});