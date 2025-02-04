import { Avatar } from '@mui/material';

interface AvatarComFotoProps{
    altura: number,
    largura: number,
    urlFoto: string
}

const AvatarComFoto = (props: AvatarComFotoProps) => {
    return (
        <Avatar variant="rounded" sx={{ height: props.altura, width: props.largura }}
            src={props.urlFoto}/>
    );
};

export default AvatarComFoto;
