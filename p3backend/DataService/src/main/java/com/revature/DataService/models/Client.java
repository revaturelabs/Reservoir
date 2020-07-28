package com.revature.DataService.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(schema = "project3", name = "client")
public class Client {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "client_id")
	private Integer clientId;

	@Column(name = "name")
	private String name;

	@JsonIgnoreProperties({ "client" })
	@OneToMany(mappedBy = "client", cascade = CascadeType.MERGE)
	private List<ClientDemand> clientDemand;

	public Client() {
		super();
	}

	public Client(Integer clientId, String name, List<ClientDemand> clientDemand) {
		super();
		this.clientId = clientId;
		this.name = name;
		this.clientDemand = clientDemand;
	}

	public Integer getClientId() {
		return clientId;
	}

	public void setClientId(Integer clientId) {
		this.clientId = clientId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<ClientDemand> getClientDemand() {
		return clientDemand;
	}

	public void setClientDemand(List<ClientDemand> clientDemand) {
		this.clientDemand = clientDemand;
	}

	@Override
	public String toString() {
		return "Client [clientId=" + clientId + ", name=" + name + ", clientDemand=" + clientDemand + "]";
	}
}
