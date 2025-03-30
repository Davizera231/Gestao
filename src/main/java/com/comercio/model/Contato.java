/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.comercio.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;


@Entity
public class Contato {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String tipo;
    private String valor;
    private String observacao;
    
    
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    @JsonBackReference
    private Cliente cliente;
    
    // Construtores
    public Contato() {
        
    }
    
    public Contato(String tipo, String valor, String observacao, Cliente cliente){
        this.tipo = tipo; 
        this.valor = valor; 
        this.observacao = observacao;
        this.cliente = cliente;
    }
    
    // Getters e Setters
    public Integer getId(){
        return id; 
    }
    
    public void setId(Integer id){
        this.id = id;
    }
    
    public String getTipo(){
        return tipo;
    }
    
    public void setTipo(String tipo){
        this.tipo = tipo;
    }
    
    public String getValor(){
        return valor;
    }
    
    public void setValor(String valor){
        this.valor = valor;
    }
    
    public void setObservacao(String observacao){
        this.observacao = observacao;
    }
    
    
    public String getObservacao(){
        return observacao;
    }
    
    public Cliente getCliente(){
        return cliente; 
    }
    
    public void setCliente(Cliente cliente){
        this.cliente = cliente;
    }

    
    

    

    

    

    
    
    
    
    
}
