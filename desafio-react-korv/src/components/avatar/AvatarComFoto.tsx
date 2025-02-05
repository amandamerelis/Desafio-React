import { Avatar } from '@mui/material';

type EstiloAvatar = 'circular' | 'rounded';
type TamanhoAvatar = 'pequeno' | 'medio' | 'grande';

interface AvatarComFotoProps{
    tamanho: TamanhoAvatar,
    estilo: EstiloAvatar
    urlFoto: string,
}

const AvatarComFoto = (props: AvatarComFotoProps) => {

    const tamanho: number = definirTamanhoAvatar(props.tamanho);

    function definirTamanhoAvatar(estilo: TamanhoAvatar): number {
        switch (estilo){
        case 'pequeno': return 24;
        case 'medio': return 38;
        case 'grande': return 50;
        default: return 36;
        }
    }

    return (
        <Avatar variant={props.estilo} sx={{ height: tamanho, width: tamanho }}
            src={props.urlFoto}/>
    );
};

export default AvatarComFoto;
