import { Avatar } from '@mui/material';
import { stringToColor } from '../../utils/FuncoesUteis.ts';

interface AvatarComIniciaisProps {
    altura: number,
    largura: number,
    nome: string
}

const AvatarComIniciais = (props: AvatarComIniciaisProps) => {

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
