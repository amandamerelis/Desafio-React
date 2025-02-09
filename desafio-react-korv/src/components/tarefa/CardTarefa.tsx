import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
    useTheme
} from '@mui/material';
import { TarefaModel } from '../../types/tarefa.model.ts';
import { formatarData, stringToColor } from '../../utils/funcoesUteis.ts';
import AvatarComFoto from '../avatar/AvatarComFoto.tsx';
import AvatarComIniciais from '../avatar/AvatarComIniciais.tsx';
import { ArrowLeft, ArrowRight, Delete, Edit, MoreVert } from '@mui/icons-material';
import React from 'react';
import { SituacaoTarefaEnum } from '../../types/enums/situacao-tarefa.enum.ts';
import useMudarSituacaoTarefa from '../../hooks/useMudarSituacaoTarefa.tsx';

const separador = (
    <Box component="span" sx={{ display: 'inline-block', mx: '2px' }}>
        •
    </Box>
);

interface CardTarefaProps {
    tarefa: TarefaModel,
    canEdit: boolean,
    onEditar: (tarefa: TarefaModel) => void,
    onExcluir: (idTarefa: number) => void,
    onMudarSituacao: (tarefa: TarefaModel) => void
}

const CardTarefa = ({ tarefa, onEditar, canEdit, onExcluir, onMudarSituacao }: CardTarefaProps) => {
    const theme = useTheme();

    const [menuSuspenso, setMenuSuspenso] = React.useState<null | HTMLElement>(null);
    const open = Boolean(menuSuspenso);
    const { mudarSituacao } = useMudarSituacaoTarefa();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuSuspenso(event.currentTarget);
    };

    const handleExcluir = () => {
        setMenuSuspenso(null);
        onExcluir(tarefa.id);
    };

    const handleOnClose = () => {
        setMenuSuspenso(null);
    };

    const handleEditar = () => {
        setMenuSuspenso(null);
        onEditar(tarefa);
    };

    const handleAvancar = () => {
        onMudarSituacao(mudarSituacao(tarefa, 'avancar'));
    };

    const handleRetroceder = () => {
        onMudarSituacao(mudarSituacao(tarefa, 'retroceder'));
    };

    function podeAvancar(): boolean {
        return tarefa.situacao !== SituacaoTarefaEnum.FEITO;
    }

    function podeRetroceder(): boolean {
        return tarefa.situacao !== SituacaoTarefaEnum.PENDENTE;
    }

    return (
        <Card sx={{ width: theme.spacing(74), textAlign: 'start' }}>
            <CardHeader
                title={<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6">{tarefa.titulo}</Typography>
                    {canEdit && <IconButton onClick={handleClick}><MoreVert/></IconButton>}

                    <Menu
                        id="basic-menu"
                        anchorEl={menuSuspenso}
                        open={open}
                        onClose={handleOnClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleEditar}>
                            <ListItemIcon>
                                <Edit fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText>Editar</ListItemText></MenuItem>
                        <MenuItem onClick={handleExcluir}>
                            <ListItemIcon>
                                <Delete fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText>Excluir</ListItemText>
                        </MenuItem>
                    </Menu>

                </Box>
                }
                subheader={
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        {formatarData(tarefa.dataCriacao, 'medio')} {separador} Criado
                        por <b>{tarefa.criador.nome}</b>
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
                    marginTop: 2,
                    gap: 2
                }}>
                    <IconButton disabled={!podeRetroceder()} onClick={handleRetroceder}><ArrowLeft/></IconButton>
                    {tarefa.criador.urlFoto
                        ? <AvatarComFoto tamanho="pequeno" estilo="circular" urlFoto={tarefa.criador.urlFoto}/>
                        : <AvatarComIniciais tamanho="pequeno" estilo="circular" nome={tarefa.criador.nome}/>}
                    <IconButton disabled={!podeAvancar()} onClick={handleAvancar}><ArrowRight/></IconButton>

                </Box>

            </CardContent>
        </Card>

    );
};

export default CardTarefa;
