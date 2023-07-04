# Azure Provider source and version being used
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.63.0"
    }
  }
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

resource "azurerm_container_registry" "acr" {
  name                     = "gysACR"
  resource_group_name      = azurerm_resource_group.rg_main.name
  location                 = azurerm_resource_group.rg_main.location
  sku                      = "Standard"
  tags = {
    environment = "GYS"
  }
}

resource "azurerm_kubernetes_cluster" "akc" {
  location            = azurerm_resource_group.rg_main.location
  name                = "gys-akc"
  resource_group_name = azurerm_resource_group.rg_main.name
  dns_prefix = "gys-akc"

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


