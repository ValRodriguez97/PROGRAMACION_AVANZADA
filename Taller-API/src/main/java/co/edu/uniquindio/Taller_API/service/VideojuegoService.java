package co.edu.uniquindio.Taller_API.service;

import co.edu.uniquindio.Taller_API.entity.Videojuego;
import co.edu.uniquindio.Taller_API.exception.ResourceNotFoundException;
import co.edu.uniquindio.Taller_API.repository.DesarrolladoraRepository;
import co.edu.uniquindio.Taller_API.repository.VideoJuegoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VideojuegoService {

    private final VideoJuegoRepository videoJuegoRepository;
    private final DesarrolladoraRepository desarrolladoraRepository;

    public List<Videojuego> listarTodos(){
        List<Videojuego> lista = videoJuegoRepository.findAll();
        lista.forEach(this::calcularIva);
        return lista;
    }

    public Videojuego obtenerPorId(Long id){
        Videojuego videojuego = videoJuegoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Videojuego no encontrado"));
        calcularIva(videojuego);
        return videojuego;
    }

    public Videojuego guardar(Videojuego videojuego){
        if (videojuego.getPrecio() < 0) throw new IllegalArgumentException("El precio no puede ser negativo");
        if(videojuego.getTitulo() == null || videojuego.getTitulo().isBlank()) throw new IllegalArgumentException("El titulo no puede estar vacio");

        desarrolladoraRepository.findById(videojuego.getDesarrolladora().getId()).orElseThrow(() -> new ResourceNotFoundException("Desarrolladora no encontrada"));
        return videoJuegoRepository.save(videojuego);
    }

    public Videojuego aplicarDescuento(Long id, double porcentaje){
        Videojuego videojuego = obtenerPorId(id);
        double nuevoPrecio = videojuego.getPrecio() - (videojuego.getPrecio() * porcentaje / 100);
        videojuego.setPrecio(nuevoPrecio);
        return videoJuegoRepository.save(videojuego);
    }

    private void calcularIva(Videojuego videojuego){
        videojuego.setPrecioConIva(videojuego.getPrecio() * 1.19);
    }
}
