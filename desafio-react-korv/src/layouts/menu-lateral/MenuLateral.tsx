import InfoUsuarioLogado from '../../components/usuarios/InfoUsuarioLogado.tsx';
import { Add } from '@mui/icons-material';
import { useMenuLateralContext } from '../../contexts';
import { Box, Button, Drawer, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { UsuarioModel } from '../../types/usuario.model.ts';
import ListaProjetos from '../../components/projetos/ListaProjetos.tsx';
import FormProjeto from '../../components/projetos/FormProjeto.tsx';
import { ProjetoModel } from '../../types/projeto.model.ts';
import { ProjetoService } from '../../services/ProjetoService.ts';

interface MenuLateralProps {
    children: React.ReactNode;
}

const MenuLateral = ({ children }: MenuLateralProps) => {

    const teste = { id: 1, nome: 'Teste Ceste fulano' } as UsuarioModel;

    const theme = useTheme();
    const menorQueSm = useMediaQuery(theme.breakpoints.down('sm'));
    const { isMenuAberto, toggleMenuLateral, larguraDrawer } = useMenuLateralContext();

    const [formProjetoOpen, setFormProjetoOpen] = useState(false);
    const [projetos, setProjetos] = useState<ProjetoModel[]>([]);

    useEffect(() => {
        ProjetoService.buscarPorParticipanteId(1)
            .then(resposta => setProjetos(resposta));

    }, []);

    const handleNovoProjeto = () => {
        setFormProjetoOpen(true);
    };

    const handleOnClose = (dados: Partial<ProjetoModel> | null) => {
        if (dados) {
            dados.criador = teste;
            ProjetoService.criar(dados).then(() => {
                ProjetoService.buscarPorParticipanteId(teste.id)
                    .then(resposta => setProjetos(resposta));
            });
        }
        setFormProjetoOpen(false);
    };

    return (
        <>
            <Drawer open={isMenuAberto} variant={menorQueSm ? 'temporary' : 'permanent'} onClose={toggleMenuLateral}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: `${larguraDrawer}px`,
                        height: '100%'
                    }}>
                    <Box marginTop={theme.spacing(2)}>
                        <InfoUsuarioLogado usuario={teste}/>
                    </Box>
                    <Box flex={1} marginTop={theme.spacing(4)}>
                        <ListaProjetos projetos={projetos}/>
                    </Box>
                    <Button sx={{
                        marginY: theme.spacing(6),
                        paddingX: theme.spacing(10),
                        bgcolor: 'background.default',
                        color: 'text.primary'
                    }} variant="contained" startIcon={<Add/>} onClick={handleNovoProjeto}>
                        Novo projeto
                    </Button>
                </Box>
            </Drawer>

            <Box
                component="main"
                sx={{
                    height: '100vh',
                    width: { xs: '100%', sm: `calc(100% - ${larguraDrawer}px)` },
                    ml: { sm: `${larguraDrawer}px` }
                }}>
                {children}
                <FormProjeto open={formProjetoOpen} onClose={handleOnClose} dados={null} usuario={teste}/>
            </Box>
        </>
    );
};

export default MenuLateral;
