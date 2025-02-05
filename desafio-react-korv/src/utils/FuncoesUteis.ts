type FormatoData = 'curto' | 'medio' | 'longo';

export function formatarData(data: Date, formato: FormatoData): string {

    const formatarMedio = (data: Date) => {
        const partes = new Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'short',
            year: '2-digit'
        }).formatToParts(data);

        const dia = partes.find(p => p.type === 'day')?.value;
        const mes = partes.find(p => p.type === 'month')?.value;
        const ano = partes.find(p => p.type === 'year')?.value;

        return `${dia} ${mes} ${ano}`;
    };

    switch (formato) {
    case 'curto':
        return Intl.DateTimeFormat('pt-BR', {
            day: 'numeric',
            month: 'short',
            year: '2-digit',

        }).format(data);

    case 'medio':
        return formatarMedio(data);

    case 'longo':
        return Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'long'
        }).format(data);

    default:
        return Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'short'
        }).format(data);
    }
}

export function stringToColor(string: string) {
    let hash = 0;
    let i;


    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }


    return color;
}
