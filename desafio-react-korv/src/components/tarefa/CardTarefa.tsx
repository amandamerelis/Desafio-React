import { Box, Card, CardContent, CardHeader, Chip, IconButton, Typography, useTheme } from '@mui/material';
import { TarefaModel } from '../../types/tarefa.model.ts';
import { formatarData, stringToColor } from '../../utils/FuncoesUteis.ts';
import AvatarComFoto from '../avatar/AvatarComFoto.tsx';
import AvatarComIniciais from '../avatar/AvatarComIniciais.tsx';
import { Edit } from '@mui/icons-material';

const separador = (
    <Box component="span" sx={{ display: 'inline-block', mx: '2px' }}>
        •
    </Box>
);

interface CardTarefaProps {
    tarefa: TarefaModel,
    canEdit: boolean,
    onEditar: (tarefa: TarefaModel) => void
}

const CardTarefa = ({ tarefa, onEditar, canEdit }: CardTarefaProps) => {
    const theme = useTheme();
    const handleEditar = () =>{
        onEditar(tarefa);
    };
    return (
        <Card sx={{ width: theme.spacing(74), textAlign: 'start' }}>
            <CardHeader
                title={<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6">{tarefa.titulo}</Typography>
                    {canEdit && <IconButton onClick={handleEditar}><Edit/></IconButton>}
                </Box>
                }
                subheader={
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        {formatarData(tarefa.dataCriacao, 'medio')} {separador} Criado por <b>{tarefa.criador.nome}</b>
                    </Typography>
                }
            />
            <CardContent>
                <Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {tarefa.descricao}
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 1,
                    marginY: 6
                }}>
                    {tarefa.tags.map((tag, index) => (
                        <Chip key={index} label={tag} size="small" variant="filled"
                            sx={{
                                borderRadius: 1,
                                p: 1,
                                bgcolor: stringToColor(tag),
                                color: theme.palette.getContrastText(stringToColor(tag)),
                            }}/>
                    ))}

                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 2
                }}>
                    {tarefa.criador.urlFoto
                        ? <AvatarComFoto tamanho="pequeno" estilo="circular" urlFoto={tarefa.criador.urlFoto}/>
                        : <AvatarComIniciais tamanho="pequeno" estilo="circular" nome={tarefa.criador.nome}/>}
                </Box>

            </CardContent>
        </Card>
    );
};

export default CardTarefa;
