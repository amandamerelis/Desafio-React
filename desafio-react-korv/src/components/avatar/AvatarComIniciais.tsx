import { Avatar } from '@mui/material';
import { stringToColor } from '../../utils/FuncoesUteis.ts';

type EstiloAvatar = 'circular' | 'rounded';
type TamanhoAvatar = 'pequeno' | 'medio' | 'grande';

interface AvatarComIniciaisProps {
    tamanho: TamanhoAvatar,
    estilo: EstiloAvatar
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
                height: tamanho,
                width: tamanho,
                fontSize: props.tamanho == 'pequeno' ? '10px' : undefined,
                bgcolor: stringToColor(nome),
            },
            children: initials,
        };
    }

    const tamanho: number = definirTamanhoAvatar(props.tamanho);

    function definirTamanhoAvatar(estilo: TamanhoAvatar): number {
        switch (estilo){
        case 'pequeno': return 24;
        case 'medio': return 38;
        case 'grande': return 50;
        default: return 38;
        }
    }

    return (
        <Avatar variant={props.estilo} {...stringAvatar(props.nome)}/>
    );
};

export default AvatarComIniciais;
