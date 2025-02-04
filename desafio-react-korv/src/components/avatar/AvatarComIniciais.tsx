import { Avatar } from '@mui/material';

interface AvatarComIniciaisProps {
    altura: number,
    largura: number,
    nome: string
}

const AvatarComIniciais = (props: AvatarComIniciaisProps) => {

    function stringToColor(string: string) {
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

    function stringAvatar(nome: string) {
        const nameParts = nome.split(' ');
        const initials = nameParts.length > 1
            ? `${nameParts[0][0]}${nameParts[1][0]}`
            : nome[0];

        return {
            sx: {
                bgcolor: stringToColor(nome),
            },
            children: initials,
        };
    }

    return (
        <Avatar variant="rounded" {...stringAvatar(props.nome)}/>
    );
};

export default AvatarComIniciais;
