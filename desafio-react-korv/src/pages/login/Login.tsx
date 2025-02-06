import { Button, Card, CardActions, CardContent, TextField, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UsuarioService } from '../../services/UsuarioService.ts';
import { useAuthContext } from '../../contexts/AuthContext.tsx';

const Login = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { login, logout } = useAuthContext();

    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            login: '',
            senha: ''
        }
    });

    const onSubmit = (data: { login: string, senha: string }) => {
        UsuarioService.login(data).then(resp => {
            if (resp instanceof Error) {
                alert(resp.message);
                logout();
            } else {
                login(resp);
                reset();
                navigate('/home');
            }
        });
    };

    return (
        <Card sx={{ width: theme.spacing(80), height: theme.spacing(80), marginTop: 20 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    alignItens: 'center',
                    justifyContent: 'center'
                }}>
                    <TextField
                        sx={{ width: theme.spacing(70) }}
                        margin="normal"
                        label="Login"
                        {...register('login', {
                            required: 'Campo obrigatório.'
                        })}
                        error={!!errors.login}
                        helperText={errors.login?.message?.toString()}
                    />
                    <TextField
                        sx={{ width: theme.spacing(70) }}
                        margin="normal"
                        label="Senha"
                        {...register('senha', {
                            required: 'Campo obrigatório.'
                        })}
                        error={!!errors.senha}
                        helperText={errors.senha?.message?.toString()}
                    />

                </CardContent>
                <CardActions sx={{ display: 'flex', alignItens: 'center', justifyContent: 'center', paddingBottom: 6 }}>
                    <Button variant="contained" color="primary"
                        sx={{
                            paddingX: theme.spacing(10)
                        }} onClick={handleSubmit(onSubmit)}>Entrar</Button>
                </CardActions>
            </form>
        </Card>
    );
};

export default Login;
