package co.edu.uniquindio.Taller_API.controller;

import co.edu.uniquindio.Taller_API.entity.Videojuego;
import co.edu.uniquindio.Taller_API.service.VideojuegoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class VideojuegoController {
    private final VideojuegoService service;

    @GetMapping
    public List<Videojuego> listar(){
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Videojuego obtener(@PathVariable Long id){
        return service.obtenerPorId(id);
    }

    @PostMapping
    public Videojuego crear(@RequestBody Videojuego videojuego){
        return service.guardar(videojuego);
    }

    @PutMapping("/{id}")
    public Videojuego actualizar(@PathVariable Long id, @RequestBody Videojuego videojuego){
        videojuego.setId(id);
        return service.guardar(videojuego);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        service.obtenerPorId(id);
        service.eliminarPorId(id);
    }

    @GetMapping("/buscar")
    public List<Videojuego> buscar(@RequestParam String titulo){
        return service.buscarPorTitulo(titulo);
    }

    @GetMapping("/rango-precio")
    public List<Videojuego> rango(@RequestParam Double min, @RequestParam Double max){
        return service.buscarPorRango(min, max);
    }

    @PatchMapping("/{id/descuento")
    public Videojuego descuento (@PathVariable Long id, @RequestParam double procentaje){
        return service.aplicarDescuento(id, procentaje);
    }

}
