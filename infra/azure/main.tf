# Azure Provider source and version being used
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.63.0"
    }
  }
  backend "azurerm" {}
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}
}

# Main resource group
resource "azurerm_resource_group" "rg_main" {
  name     = var.resource_group
  location = var.location
  tags = {
    environment = "GYS"
  }
}

resource "azurerm_storage_account" "gys-storage" {
  account_replication_type = "ZRS"
  account_tier             = "Standard"
  location                 = azurerm_resource_group.rg_main.location
  name                     = "gysstorageaccount"
  resource_group_name      = azurerm_resource_group.rg_main.name

  tags = {
    environment = "GYS"
  }
}

resource "azurerm_storage_container" "gys-storage-container" {
  name                  = "tfstate"
  storage_account_name  = azurerm_storage_account.gys-storage.name
  container_access_type = "container"
}

resource "azurerm_container_registry" "acr" {
  name                   = "gysACR"
  resource_group_name    = azurerm_resource_group.rg_main.name
  location               = azurerm_resource_group.rg_main.location
  sku                    = "Standard"
  anonymous_pull_enabled = true
  tags = {
    environment = "GYS"
  }
}

resource "azurerm_kubernetes_cluster" "akc" {
  location            = azurerm_resource_group.rg_main.location
  name                = "gys-akc"
  resource_group_name = azurerm_resource_group.rg_main.name
  dns_prefix          = "gys-akc"
#  network_profile {
#    network_plugin    = "azure"
#    load_balancer_sku = "standard"
#    load_balancer_profile {
#      outbound_ip_address_ids = [azurerm_public_ip.gys-akc-public-ip.id]
#    }
#  }

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_B2s"
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    environment = "GYS"
  }
}

resource "azurerm_public_ip" "gys-akc-public-ip" {
  allocation_method   = "Static"
  location            = azurerm_resource_group.rg_main.location
  name                = "gys-akc-public-ip"
  resource_group_name = azurerm_kubernetes_cluster.akc.node_resource_group
  sku                 = "Standard"
}

#resource "azurerm_lb" "gys-akc-lb" {
#  location            = azurerm_resource_group.rg_main.location
#  name                = "gys-akc-lb"
#  resource_group_name = azurerm_resource_group.rg_main.name
#
#  frontend_ip_configuration {
#    name = "PublicIPAddress"
#    public_ip_address_id = azurerm_public_ip.gys-akc-public-ip.id
#  }
#}